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
                
                }
            });
        }
        console.log('Inserted all soft skills into the database.');
    }
}

async function main() {
    await ensureSoftSkillsInDb();

   
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });