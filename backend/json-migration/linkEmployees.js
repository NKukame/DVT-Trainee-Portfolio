import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';  

const prisma = new PrismaClient();

const employees = prisma.employee.findMany();
const techStacks = prisma.techStack.findMany();
const allEmployees = JSON.parse(fs.readFileSync('../Data/team-portfolio.json', 'utf-8'));

async function main() {

    for( const employee of allEmployees) {
        try {
            const emp = await employees;
            const tech = await techStacks;

            // Find the employee by name
            const foundEmployee = emp.find(e => e.name === employee.name);
            if (!foundEmployee) {
                console.error(`Employee ${employee.name} not found.`);
                continue;
            }


            for( const techStack of employee.techStack) {
                // Find the tech stack by name
                const foundTech = tech.find(t => t.name === techStack);
                if (!foundTech) {
                    console.error(`Tech stack ${techStack} not found for employee ${employee.name}.`);
                    continue;
                }

                // Link the employee to the tech stack
                await prisma.employeeTechStack.create({
                    data: {
                        employeeId: foundEmployee.id,
                        techStackId: foundTech.id
                    }
                });

                console.log(`Linked ${employee.name} to tech stack ${techStack}.`);
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
