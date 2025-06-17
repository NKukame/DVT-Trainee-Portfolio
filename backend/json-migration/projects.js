import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const projectData = JSON.parse(fs.readFileSync('../Data/Projects.json', 'utf-8'));

async function getOrCreateIndustry(name) {
  const existing = await prisma.industry.findUnique({ where: { name } });
  if (existing) return existing;
  return prisma.industry.create({ data: { name } });
}

function getCategoryForTech(name) {
  const tech = name.toLowerCase();

  if (['react', 'vue', 'angular', 'html', 'css', 'javascript', 'next.js'].includes(tech)) {
    return 'FRONTEND';
  }

  if (['node.js', 'django', 'spring', 'express', 'fastapi', 'flask', 'java', 'c#', 'python'].includes(tech)) {
    return 'BACKEND';
  }

  if (['figma', 'adobe xd', 'sketch'].includes(tech)) {
    return 'DESIGN';
  }

  if (['flutter', 'react native', 'swift', 'kotlin'].includes(tech)) {
    return 'MOBILE';
  }

  // fallback (optional): default to BACKEND or FRONTEND
  return 'BACKEND';
}

async function getOrCreateTechStack(name) {
  const existing = await prisma.techStack.findUnique({ where: { name } });
  if (existing) return existing;

  const category = getCategoryForTech(name);

  return prisma.techStack.create({
    data: {
      name,
      category
    }
  });
}


async function main() {
  const employees = await prisma.employee.findMany();

  for (const project of projectData) {
    const createdProject = await prisma.project.upsert({
      where: { name: project.name },
      update: {
        description: project.description,
        github: project.github,
        demo: project.demo,
        screenshot: project.screenshot,
        updatedAt: new Date()
      },
      create: {
        name: project.name,
        employeeId: project.employeeId, // Assuming employeeId is provided in the project data
        description: project.description,
        github: project.github,
        demo: project.demo,
        screenshot: project.screenshot
      }
    });

    console.log(`✅ Project: ${createdProject.name}`);

    // --- INDUSTRIES ---
    for (const industryName of project.industries || []) {
      const industry = await getOrCreateIndustry(industryName);
      await prisma.projectIndustry.upsert({
        where: {
          projectId_industryId: {
            projectId: createdProject.id,
            industryId: industry.id
          }
        },
        update: {},
        create: {
          projectId: createdProject.id,
          industryId: industry.id
        }
      });
    }

    // --- TECH STACK ---
    for (const techName of project.techStack || []) {
      const tech = await getOrCreateTechStack(techName);
      await prisma.projectTechStack.upsert({
        where: {
          projectId_techStackId: {
            projectId: createdProject.id,

            techStackId: tech.id
          }
        },
        update: {},
        create: {
          projectId: createdProject.id,
          techStackId: tech.id
        }
      });
    }

    // --- MEMBERS ---
    for (const member of project.members || []) {
      const employee = employees.find(e => e.name === member.name);
      if (!employee) {
        console.warn(`⚠️ Employee not found: ${member.name}`);
        continue;
      }

      await prisma.projectMember.upsert({
        where: {
          projectId_employeeId: {
            projectId: createdProject.id,
            employeeId: employee.id
          }
        },
        update: {
          role: member.role,
        },
        create: {
          projectId: createdProject.id,
          employeeId: employee.id,
          role: member.role,
        }
      });

      console.log(`   ↪ Member added: ${employee.name} (${member.role})`);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
