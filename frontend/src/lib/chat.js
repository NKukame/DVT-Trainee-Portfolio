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

async function loadEmployeesDeep(
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

async function loadProjectsAndRelations(
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

async function tool_findEmployeeByName(searchTerm) {
  await loadEmployeesDeep();
  const { results } = searchEmployeesInCache({
    searchTerm,
    limit: 50,
    offset: 0,
  });
  return {
    success: true,
    employees: results.map((emp) => ({
      id: emp.id,
      name: `${emp.title ?? ""} ${emp.name ?? ""} ${emp.surname ?? ""}`.trim(),
      email: emp.email,
      role: emp.role,
      department: emp.department,
      company: emp.company,
      education: emp.education,
      certificates: emp.certificates,
      career: emp.career,
      testimonials: emp.testimonials,
      availability: emp.availability,
      techStack: emp.techStack,
      softSkills: emp.softSkills,
      projects: emp.projects,
    })),
    count: results.length,
  };
}

async function tool_searchEmployeesBySkills(
  techSkill,
  role,
  department
) {
  await loadEmployeesDeep();
  const { results, total } = searchEmployeesInCache({
    techSkill,
    role,
    department,
    limit: 100,
    offset: 0,
  });
  return {
    success: true,
    employees: results.map((emp) => ({
      id: emp.id,
      name: `${emp.title ?? ""} ${emp.name ?? ""} ${emp.surname ?? ""}`.trim(),
      email: emp.email,
      role: emp.role,
      department: emp.department,
      company: emp.company,
      experience: emp.experience,
    })),
    count: total,
    searchCriteria: { techSkill, role, department },
  };
}

async function tool_getProjectDetails(
  projectId,
  projectName
) {
  await loadProjectsAndRelations();

  let project = null;
  if (projectId) {
    project = cache.projectsById.get(projectId) ?? null;
  } else if (projectName) {
    const pn = normalizeStr(projectName);
    project = cache.projects.find((p) => normalizeStr(p?.name) === pn) ?? null;
  } else {
    throw new Error("Either projectId or projectName is required");
  }

  if (!project) {
    return { success: false, error: "Project not found" };
  }

  const full = assembleProjectDetails(project);
  return { success: true, project: full };
}

async function tool_getAvailableEmployees(role, techSkill) {
  await loadEmployeesDeep();
  const { results, total } = searchEmployeesInCache({
    role,
    techSkill,
    available: true,
    limit: 100,
    offset: 0,
  });
  return {
    success: true,
    employees: results.map((emp) => ({
      id: emp.id,
      name: `${emp.title ?? ""} ${emp.name ?? ""} ${emp.surname ?? ""}`.trim(),
      email: emp.email,
      role: emp.role,
      department: emp.department,
      company: emp.company,
      experience: emp.experience,
      github: emp.github,
      linkedIn: emp.linkedIn,
    })),
    count: total,
    searchCriteria: { role, techSkill },
  };
}

async function tool_createEmployeeProfile(profileData) {
  const employee = await dataProvider.create({
    resource: "employee",
    variables: profileData,
  });

  await dataProvider.create({
    resource: "availability",
    variables: {
      employeeId: employee.data.id,
      available: true,
      client: "DVT",
    },
  });
  // Optimistic cache update
  try {
    const createdFull = await dataProvider.getOne({
      resource: "employee",
      id: employee.data.id,
      meta: { include: EMPLOYEE_INCLUDE_DEEP },
    });
    const updated = cache.employees
      .filter((e) => e.id !== employee.data.id)
      .concat(createdFull.data);
    buildEmployeeIndexes(updated);
  } catch {
    const minimal = {
      ...employee.data,
      availability: { available: true, client: "DVT" },
    };
    const updated = cache.employees
      .filter((e) => e.id !== employee.data.id)
      .concat(minimal);
    buildEmployeeIndexes(updated);
  }

  return {
    success: true,
    employee: employee.data,
    message: `Employee profile created for ${profileData.name} ${profileData.surname}`,
  };
}

async function tool_primeCache(params) {
  const scopes =
    params?.scopes && params.scopes.length
      ? params.scopes
      : ["employees", "projects"];
  if (scopes.includes("employees")) {
    await loadEmployeesDeep({
      force: Boolean(params?.force),
      pageSize: params?.pageSize || DEFAULT_PAGE_SIZE,
    });
  }
  if (scopes.includes("projects")) {
    await loadProjectsAndRelations({
      force: Boolean(params?.force),
      pageSize: params?.pageSize || DEFAULT_PAGE_SIZE,
    });
  }
  return {
    success: true,
    primed: scopes,
    employeesCached: cache.employees.length,
    projectsCached: cache.projects.length,
  };
}

async function tool_refreshCache(params) {
  const scopes =
    params?.scopes && params.scopes.length
      ? params.scopes
      : ["employees", "projects"];
  if (scopes.includes("employees")) {
    await loadEmployeesDeep({ force: Boolean(params?.force) });
  }
  if (scopes.includes("projects")) {
    await loadProjectsAndRelations({ force: Boolean(params?.force) });
  }
  return {
    success: true,
    refreshed: scopes,
    employeesCached: cache.employees.length,
    projectsCached: cache.projects.length,
  };
}

async function t_searchEmployees(params) {
  await loadEmployeesDeep();
  const { results, total } = searchEmployeesInCache(params || {});
  return {
    success: true,
    employees: results.map((emp) => ({
      id: emp.id,
      name: `${emp.title ?? ""} ${emp.name ?? ""} ${emp.surname ?? ""}`.trim(),
      email: emp.email,
      role: emp.role,
      department: emp.department,
      company: emp.company,
      availability: emp.availability,
      techStack: emp.techStack,
    })),
    count: total,
    criteria: params || {},
  };
}

async function t_getEmployeeProfileCached(employeeId) {
  await loadEmployeesDeep();
  const emp = cache.employeesById.get(employeeId);
  if (!emp) {
    return { success: false, error: "Employee not found in cache" };
  }
  return { success: true, employee: emp };
}

async function t_listSkills(params) {
  await loadEmployeesDeep();
  const query = normalizeStr(params?.query);
  const limit = params?.limit ?? 50;
  const withCounts = params?.withCounts ?? true;

  const entries = [];
  for (const [skill, ids] of cache.skillIndex) {
    if (query && !skill.includes(query)) continue;
    entries.push({ skill, count: ids.size });
  }
  entries.sort((a, b) => b.count - a.count || a.skill.localeCompare(b.skill));
  const top = entries.slice(0, limit);

  return {
    success: true,
    skills: top.map((e) =>
      withCounts ? { name: e.skill, count: e.count } : { name: e.skill }
    ),
  };
}