import prisma, {redis} from "../lib/prisma-redis-middleware.js";
import { getCache,setCache } from "../lib/prisma-redis-middleware.js";
 
export async function SearchEmployeeController(req, res)  {
  const startTime = Date.now();
  const { email} = req.params;

  try{
    const cacheKey = `searchEmployee:${email}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      console.log('Cache hit for SearchEmployeeController', email);
      const queryTime = Date.now() - startTime;

      return res.json({
        success: true,
        data: cached,
        performance: {
          queryTime: `${queryTime}ms`,
          cached: true,
          count: cached.length,
          searchTerm: email
        }
      });
    }

    console.log('Cache miss for SearchEmployeeController', email);

    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        employee: {
          select: {
           email: true,
            role: true,
           
          }
        }
      }
    });

      if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Employee not found' 
            });
        }
    
    const queryTime = Date.now() - startTime;

    await setCache(cacheKey, user, 30 * 60); 

    return res.json({
      success: true,
      data: user,
      performance: {
        queryTime: `${queryTime}ms`,
        cached: false,
        searchTerm: email
      }
    });

  } catch (error) {
    console.error('Error in SearchEmployeeController:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search employee'
    });
  }
}

export async function SearchProjectController(req, res) {
  const startTime = Date.now();
  const { name } = req.params;

  try{
    const cacheKey = `searchProject:${name}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      console.log('Cache hit for SearchProjectController', name);
      const queryTime = Date.now() - startTime;

      return res.json({
        success: true,
        data: cached,
        performance: {
          queryTime: `${queryTime}ms`,
          cached: true,
          searchTerm: name
        }
      });
    }
    
    console.log('Cache miss for SearchProjectController',name);
    
    const selectedProject = await prisma.project.findFirst({
      where: { name },
      include: {
        members: {
          include: {
             employee: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        techStack:{
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

    if (!selectedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const queryTime = Date.now() - startTime;
    await setCache(cacheKey, selectedProject, 0 * 60);
     
    res.json({
      success: true,
      data: selectedProject,
      performance: {
        queryTime: `${queryTime}ms`,
        cached: false,
        searchTerm: name
      }
    });

  } catch (error) {
    console.error('Error in SearchProjectController:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search project'
    });
  }
}

