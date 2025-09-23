import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const employees = prisma.employee.findMany();
const data = JSON.parse(fs.readFileSync('../Data/Testimonials.json', 'utf-8'));

async function main() {

    for (const testimonial of data) {
        try {
            const emp = await employees;

            // Find the employee by name
            const foundEmployee = emp.find(e => e.name === testimonial.name);
            if (!foundEmployee) {
                console.error(`Employee ${testimonial.name} not found.`);
                continue;
            }

            // Create the testimonial
            await prisma.testimonial.create({
                data: {
                    employeeId: foundEmployee.id,
                    quote: testimonial.quote,
                    company: testimonial.company,
                    reference: testimonial.reference
                }
            });

            console.log(`Testimonial for ${testimonial.name} created successfully.`);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(`Error creating testimonial for ${testimonial.name}: ${error.message}`);
            } else {
                console.error(`Unexpected error creating testimonial for ${testimonial.name}:`, error);
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
