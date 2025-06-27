import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync('../Data/team-portfolio.json', 'utf-8'));
const data1 = JSON.parse(fs.readFileSync('../Data/techStack.json', 'utf-8'));


async function main() {

    console.log('loading user data...');

    for (const employee of data) {
        try {

              // Get today's date at midnight
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              // Get tomorrow's date at midnight
              const tomorrow = new Date(today);
              tomorrow.setDate(today.getDate() + 1);

              // Delete related ProjectMember records first
              await prisma.projectMember.deleteMany({
                where: {
                  project: {
                    createdAt: {
                      gte: today,
                      lt: tomorrow,
                    },
                  },
                },
              });

              // Delete related ProjectTechStack records next
              await prisma.projectTechStack.deleteMany({
                where: {
                  project: {
                    createdAt: {
                      gte: today,
                      lt: tomorrow,
                    },
                  },
                },
              });

              // Now delete the projects
              const deleted = await prisma.project.deleteMany({
                where: {
                  createdAt: {
                    gte: today,
                    lt: tomorrow,
                  },
                },
              });

              console.log(`Deleted ${deleted.count} projects created today.`);

            console.log(`Employee ${employee.name} created successfully.`);
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(`Error creating employee ${employee.name}: ${error.message}`);
            } else {
                console.error(`Unexpected error creating employee ${employee.name}:`, error);
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

