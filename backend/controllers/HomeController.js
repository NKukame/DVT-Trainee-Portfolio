// Replace your current HomeController.js with this:
 // This will be your Redis-enabled Prisma client

 import prisma from "../lib/prisma-redis-middleware.js";

export async function HomePortfolioController(req, res) {
    const startTime = Date.now();
    
    try {
        const users = await prisma.user.findMany({
            include: {
                employee: {
                    select: {
                        name: true,
                        surname: true,
                        role: true,
                        department: true,
                        photoUrl: true,
                        bio: true
                    }
                }
            }
        });
        
        const queryTime = Date.now() - startTime;
        
        res.json({
            success: true,
            data: users,
            performance: {
                queryTime: `${queryTime}ms`,
                cached: queryTime < 20,
                count: users.length
            }
        });
        
    } catch (error) {
        console.log('Error in HomePortfolioController:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch users'
        });
    }
}

export async function HomeProjectController(req, res) {
    const startTime = Date.now();
    
    try {
        const projects = await prisma.project.findMany({
            include: {
                members: {
                    include: {
                        employee: {
                            select: {
                                name: true,
                                surname: true,
                                role: true
                            }
                        }
                    }
                },
                techStack: {
                    include: {
                        techStack: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        
        const queryTime = Date.now() - startTime;
        
        res.json({
            success: true,
            data: projects,
            performance: {
                queryTime: `${queryTime}ms`,
                cached: queryTime < 20,
                count: projects.length
            }
        });
        
    } catch (error) {
        console.error('Error in HomeProjectController:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch projects'
        });
    }
}
// import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient()
// export async function HomePortfolioController(req, res){
  
//   const users = await prisma.user.findMany()

//   // const dataTeam = await fetch("/team-portfolio.json");
//   res.send(users);
// }

// export async function HomeProjectController(req, res){ 
//   const employees = await prisma.project.findMany();

//   return res.send(employees);
// }

