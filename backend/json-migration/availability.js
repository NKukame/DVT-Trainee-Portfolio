import fs from 'fs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const allEmployees = JSON.parse(fs.readFileSync('../Data/team-portfolio.json', 'utf-8'));

async function main() {


const dbEmployees = await prisma.employee.findMany();

    for (const employee of allEmployees) {
        const found = dbEmployees.find(emp => emp.name === employee.name);
        if (!found) {
            console.error(`Employee ${employee.name} not found in DB.`);
            continue;
        }

        // Default values if missing
        const available = employee.available !== undefined ? employee.available : false;
        const client = employee.client || "Unassigned";

        try {
            await prisma.availability.upsert({
                where: { employeeId: found.id },
                update: {
                    available,
                    client
                },
                create: {
                    employeeId: found.id,
                    available,
                    client
                }
            });

            console.log(`Set availability for ${employee.name} → ${available ? 'Available' : 'Unavailable'} (${client})`);
        } catch (error) {
            console.error(`Error for ${employee.name}:`, error.message);
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });