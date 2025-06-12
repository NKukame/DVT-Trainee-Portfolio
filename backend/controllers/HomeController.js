// Replace your current HomeController.js with this:
 // This will be your Redis-enabled Prisma client

import prisma, { redis } from "../lib/prisma-redis-middleware.js";
import { getCache, setCache } from "../lib/prisma-redis-middleware.js";

export async function HomePortfolioController(req, res) {
    const startTime = Date.now();
    try {
        const cacheKey = 'homePortfolioUsers';
        const cached = await getCache(cacheKey);
        if(cached){
            console.log('Cache hit for HomePortfolioController');
           
            const queryTime = Date.now() - startTime;
            return res.json({
                success: true,
                data: cached,
                performance: {
                    queryTime: `${queryTime}ms`,
                    cached: true,
                    count: cached.length
                }
            });
        }
        console.log('Cache miss for HomePortfolioController');
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
       setCache(cacheKey, users, 60 * 60); 
       return res.json({
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
         const cacheKey = 'homeProjectController';
        const cached = await getCache(cacheKey);
        if(cached){
            console.log('Cache hit for homeProjectController');
            const queryTime = Date.now() - startTime;
           
            return res.json({
                success: true,
                data: cached,
                performance: {
                    queryTime: `${queryTime}ms`,
                    cached: true,
                    count: cached.length
                }
            });
        }
        console.log('Cache miss for homeProjectController');
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
        setCache(cacheKey, projects, 60 * 60); 
        
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


