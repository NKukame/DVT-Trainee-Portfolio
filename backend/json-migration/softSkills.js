import fs from 'fs';
import { PrismaClient } from '@prisma/client';  

const prisma = new PrismaClient();

const allEmployees = JSON.parse(fs.readFileSync('../Data/team-portfolio.json', 'utf-8'));
const softSkillsData = JSON.parse(fs.readFileSync('../Data/SoftSkills.json', 'utf-8'));

// Helper to flatten all skills from SoftSkills.json
function getAllSoftSkillsFromJson() {
    const skills = [];
    for (const category of softSkillsData) {
        for (const skill of category.skills) {
            if (skill.name) {
                skills.push({
                    name: skill.name,
                    // description: skill.description || ""
                });
            }
        }
    }
    return skills;
}

async function ensureSoftSkillsInDb() {
    const dbSkills = await prisma.softSkill.findMany();
    if (dbSkills.length === 0) {
        const allSkills = getAllSoftSkillsFromJson();
        for (const skill of allSkills) {
            await prisma.softSkill.upsert({
                where: { name: skill.name },
                update: {},
                create: {
                    name: skill.name,
                    // description: skill.description
                }
            });
        }
        console.log('Inserted all soft skills into the database.');
    }
}

async function main() {
    await ensureSoftSkillsInDb();

    const emp = await prisma.employee.findMany();
    const skill = await prisma.softSkill.findMany();

    for (const employee of allEmployees) {
        try {
            // Find the employee by email (unique)
            const foundEmployee = emp.find(e => e.email === employee.email);
            if (!foundEmployee) {
                console.error(`Employee ${employee.name} not found.`);
                continue;
            }

            for (const softSkill of employee.softSkills || []) {
                const foundSkill = skill.find(s => s.name.trim().toLowerCase() === softSkill.trim().toLowerCase());
                if (!foundSkill) {
                    console.error(`Soft skill ${softSkill} not found for employee ${employee.name}.`);
                    continue;
                }

                // Link the employee to the soft skill
                await prisma.employeeSoftSkill.create({
                    data: {
                        employeeId: foundEmployee.id,
                        softSkillId: foundSkill.id
                    }
                });

                console.log(`Linked ${employee.name} to soft skill ${softSkill}.`);
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(`Error linking employee ${employee.name}: ${error.message}`);
            } else {
                console.error(`Unexpected error linking employee ${employee.name}:`, error);
            }
        }
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });