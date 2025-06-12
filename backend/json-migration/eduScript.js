import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const data = JSON.parse(fs.readFileSync('../Data/Education.json', 'utf-8'));
const employees = prisma.employee.findMany();

async function main() {
    console.log('loading education data...');

    for (const edu of data) {
        try {

            const emp = await employees;

            // Find the employee by name
            const foundEmployee = emp.find(e => e.name === edu.name);
            if (!foundEmployee) {
                console.error(`Employee ${edu.name} not found.`);
                continue;
            }

            


            await prisma.education.create({
                data: {
                    employeeId: foundEmployee.id,
                    // name: edu.name,
                    institution: edu.institution,
                    qualification: edu.qualification,
                }
            });
            console.log(`Education records for ${edu.name} created successfully.`);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(`Error creating education record for employee ${edu.name}: ${error.message}`);
            } else {
                console.error(`Unexpected error creating education record for employee ${edu.name}:`, error);
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