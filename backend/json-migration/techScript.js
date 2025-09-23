import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync('../Data/techStack.json', 'utf-8'));

async function main(){

    console.log('loading tech stack data...');
    for (const tech of data){
        try{
            await prisma.techStack.create({
                data:{
                    name: tech.name,
                    category:tech.category,
                }
            })
        }

        catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(`Error creating tech stack ${tech.name}: ${error.message}`);
        } else {
            console.error(`Unexpected error creating tech stack ${tech.name}:`, error);
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
    