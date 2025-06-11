import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync('../Data/team-portfolio.json', 'utf-8'));
const data1 = JSON.parse(fs.readFileSync('../Data/techStack.json', 'utf-8'));


async function main() {

    console.log('loading user data...');

    for (const employee of data) {
        try {
            await prisma.employee.create({
                data: {
                    title: employee.Role,
                    name: employee.name,  // Using the full name
                    surname: employee.name?.split(' ').slice(-1)[0] || "",
                    bio: employee.description,
                    birthday: employee.Birthday,
                    photoUrl: employee.image,
                    role: "DEVELOPER", // Assuming all roles are developers
                    department: "ENGINEERING",
                    company: employee.Company,
                    location: employee.Location,
                    email: employee.email,
                    phone: employee.Phone,
                    github: employee.github,
                    linkedIn: employee.linkedin,
                    birthday: employee.Birthday ? new Date(employee.Birthday) : null,
                }
            }); 
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

