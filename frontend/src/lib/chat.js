import { dataProvider } from "../providers/dataProvider";
import { streamText, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const deepinfra = createOpenAI({
  baseURL: "https://api.deepinfra.com/v1/openai",
  apiKey: import.meta.env.VITE_DEEPINFRA_API_KEY,
  dangerouslyAllowBrowser: true,
});

const CACHE_TTL_MS = 5 * 60 * 1000;
const DEFAULT_PAGE_SIZE = 200;

const EMPLOYEE_INCLUDE_DEEP = {
  education: true,
  certificates: true,
  career: true,
  testimonials: true,
  availability: true,
  techStack: {include: {techStack: true}},
  softSkills: {include: {softSkill: true}},
  projects: {
    include: {
      project: {
        include: {
          techStack: {include: {techStack: true}},
          industries: {include: {industry: true}},
        },
      },
    }
  }
}

const PROJECT_INCLUDE_BASE = {}


const cache = {
  employees,
  employeesById: new Map(),
  skillIndex: new Map(),
  lastEmployeesLoadedAt: 0,

  projects: [],
  projectsById: new Map(),
  projectsMembers: new Map(),
  projectsTechStack: new Map(),
  projectsIndustries: new Map(),
  lastProjectsLoadedAt: 0,
};

function now(){
  return Date.now();
}

function isStale(ts, ttlMs = CACHE_TTL_MS){
  return now() - ts > ttlMs;
}

function normalizeStr(s){
  return (s || "").trim().toLowerCase();
} 

function getEmployeeSkillNames(emp){
  const names= [];
  const items = Array.isArray(emp.techStack) ? emp.techStack : [];

  for(const ts of items) {
    const n = ts.techStack.name ?? ts.name ?? null;
    if(n) name.push(n);
  }

  return names;
}

function  buildEmployeeIndexes(employees){
  cache.employees = employees;
  cache.employeesById = new Map(employees.map(emp => [emp.id, emp]));
 
  const skillIndex = new Map();
  for(const emp of employees){
    const skillNames = getEmployeeSkillNames(emp);
    for(const skillName of skillNames){
      const key = normalizeStr(skillName);
      if(!skillIndex.has(key)){
        skillIndex.set(key, new Set());
      }
      skillIndex.get(key).add(emp);
    }
  }
  cache.skillIndex = skillIndex;
  cache.lastEmployeesLoadedAt = now();
}

async function fetchAllPages({
  resource,
  filters = [],
  meta,
  pageSize = DEFAULT_PAGE_SIZE,
}){
  let current = 1;
  let all = [];
  
  while (true) {
    const res = await dataProvider.getList({
      resource,
      filters,
      pagination: {
        current,
        pageSize,
      },
      meta,
    })

    const rows = res.data ?? [];
    all.push(...rows);
    if(!rows.length || rows.length < pageSize){
      break;
    }
    current++;  
  }

  return all;
}

async function loadEmployeeDeep(
  force = false,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  if(!force && cache.employees.length && !isStale(cache.lastEmployeesLoadedAt)){
    return;
  }

  const employees = await fetchAllPages({
    resource: "employee",
    filters,
    meta: {
      include: EMPLOYEE_INCLUDE_DEEP,
    },
    pageSize,
  });

  buildEmployeeIndexes(employees);
}
  
function searchEmployeesInCache(
  searchTerm,
  techStack,
  role,
  department,
  available,
  limit = 50,
  offset = 0,
){
  let pool = cache.employees;

  if(searchTerm){
    const q = normalizeStr(searchTerm);
    pool = pool.filter(emp => {
      const full = `${emp.name} ${emp.surname} ${emp.email}` ?? "";
      return full.includes(q.toLowerCase().trim());
    });
  }

  if(role){
    const r = normalizeStr(role);
    pool = pool.filter(emp => normalizeStr(emp.role) === r);
  }

  if(department){
    const d = normalizeStr(department);
    pool = pool.filter(emp => normalizeStr(emp.department) === d);
  }

  if(typeof available === "boolean"){
    pool = pool.filter(emp => emp.availability.available === available);
  }

  if(techStack){
    const ts = normalizeStr(techStack);
    const exactIds = cache.skillIndex.get(ts) ?? new Set();
    const unionIds = new Set(exactIds);
    for (const [skill, ids] of cache.skillIndex){
      if(skill.includes(ts)){
        for (const id of ids)unionIds.add(id);
      }
    }
    const allowed = unionIds;
    pool = pool.filter(emp => allowed.has(emp.id));
    
  }
  const total = pool.length;
  const sliced = pool.slice(offset, offset + limit);
  return { total, results: sliced };
}

async function loadProjectAndRelations(
  {
    force = false,
    pageSize = DEFAULT_PAGE_SIZE,
  } = {}) {
  if(!force && cache.projects.length && !isStale(cache.lastProjectsLoadedAt)){
    return;
  }

  const [projects, members, techStack, industries] = await Promise.all([
    fetchAllPages({
      resource: "project",
      meta: {
        include: PROJECT_INCLUDE_BASE,
      },
      pageSize,
    }),
    fetchAllPages({resource: "projectMember", pageSize}),
    fetchAllPages({resource: "projectTechStack", pageSize}),
    fetchAllPages({resource: "projectIndustry", pageSize}) 
  ]);

  cache.projects = projects;
  cache.projectsById = new Map(projects.map(proj => [proj.id, proj]));
  cache.projectsMembers = members;
  cache.projectsTechStack = techStack;
  cache.projectsIndustries = industries;
  cache.lastProjectsLoadedAt = now();
};

function assembleProjectDetails(project){
 if(!project) return null;
 const pid = project.id;
 const techStack = cache.projectsTechStack.filter(ts => ts.projectId === pid);
 const industries = cache.projectsIndustries.filter(ind => ind.projectId === pid);
 const members = cache.projectsMembers.filter(mem => mem.projectId === pid);

 return {
  ...project,
  techStack,
  industries,
  members,
 };
}