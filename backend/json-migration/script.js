import fs from 'fs';
import {Prisma, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const jsonData = JSON.parse(fs.readFileSync('team-portfolio.json', 'utf-8'));


async function main() {
    
    console.log('loading user data...');
    
    for (const user of jsonData){

        await prisma.user.create({
            jsonData: {
                name: user.name,
                description: user.description,
                email: user.email,
                github: user.github,
                linkedin: user.linkedin,
                techStack: user.techStack,
                image: user.image,
                chat: user.chat,
                phone: user.phone,
                location: user.location,
                company: user.company,
                department: user.department,
                role: user.role,
                birthday: user.birthday
            }
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(`Error creating user ${user.name}: ${error.message}`);
            } else {
                console.error(`Unexpected error creating user ${user.name}:`, error);
            }
        });
    }
}



