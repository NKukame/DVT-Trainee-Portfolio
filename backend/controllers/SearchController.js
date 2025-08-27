import prisma, {redis} from "../lib/prisma-redis-middleware.js";
import { getCache,setCache } from "../lib/prisma-redis-middleware.js";
import { setKeyValue } from '../lib/prisma-redis-middleware.js';

/**
 * Search for projects with the given query, filters, sort, page, and limit.
 * 
 * @param {Object} req - The request object containing parameters.
 * @param {Object} res - The response object used to send back the result.
 * 
 * @property {string} req.params.query - The search query to filter projects by name or description.
 * @property {Object} req.params.filters - Filters to apply to the search, including industries and tech stack.
 * @property {Array<string>} [req.params.industries] - Industry filters for the projects.
 * @property {Array<string>} [req.params.filters.projectTechStack] - Tech stack filters for the projects.
 * @property {string} req.params.field - The field to sort the results by.
 * @property {string} req.params.order - The order of sorting, can be 'asc' or 'desc'.
 * @property {number} req.params.page - The page number of results to return.
 * @property {number} req.params.limit - The number of results to return per page.
 * 
 * @returns {Object} - The search results, including the projects and the total number of results.
 * 
 * @throws {404} - If no projects are found.
 */

// const shouldCache = query || (industries && industries.length) || (techStack && techStack.length);

export async function SearchProjectController(req, res) {
  const startTime = Date.now();
  const { query, industries, techStack, field, order, page = 1, limit = 9 } = req.query; // Changed from req.params to req.query

  try {
    const where = {}
    const cacheKey = setKeyValue(
  'searchProject',
  query,
      Array.isArray(industries) ? industries.join(',') : industries,
      Array.isArray(techStack) ? techStack.join(',') : techStack,
  field,
  order,
  page,
  limit
);

    const cached = await getCache(cacheKey);
  
    if (cached) {
      console.log('Cache hit for SearchProjectController', query);
      const queryTime = Date.now() - startTime;
    
      return res.json({
        // success: true,
        projects: cached,
        total: cached.total,
        performance: {
          queryTime: `${queryTime}ms`,
          cached: true,
          count: cached.projects,
          searchTerm: cacheKey
        }
      });
    }

    if(query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (industries?.length){
      if(typeof industries === 'string') {
        industries = [industries]
      }
      where.industry = { 
        some: {
          in: industries 
        }
      }
    }

    if (techStack?.length){
      if(typeof techStack === 'string') {
        techStack = [techStack]
      }
      where.techStack = {
        some: {
          techStack: {
            name: {
              in: techStack 
            }
          }
        }
     }
    }

    const orderBy = {}

    if (field && order) {
      orderBy[field] = order
    }else {
      orderBy.createdAt = 'desc'
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: Number(limit),
        select: {
          id: true,
          name: true,
          description: true,
          github: true,
          demo: true,
          screenshot: true,
          createdAt: true,
          members: {
            select: {
              employee: {
                select: {
                  name: true,
                  photoUrl: true
                }
              }
            }
          },
          industries: {
            select: {
              industry: true
            }
          },
          techStack: {
            select: {
              techStack: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }),
      prisma.project.count({ where })
    ]);

    if (!projects) {
      return res.status(404).send({ message: "Projects not found" });
    }
    await setCache(cacheKey, projects, 30 * 60); 

    return res.send({ projects, total });
  } catch (error) {
    console.error('Search projects error:', error);
    return res.status(500).json({ error: 'Failed to search projects' });
  }
}


/**
 * Search for employees with the given query, filters, sort, page, and limit.
 * 
 * @param {Object} req - The request object containing parameters.
 * @param {Object} res - The response object used to send back the result.
 * 
 * @property {string} req.params.query - The search query to filter employees by name, surname, title, bio, company, or department.
 * @property {Object} req.params.filters - Filters to apply to the search, including location, role, tech stack, and industry.
 * @property {Array<string>} [req.params.location] - Location filters for the employees.
 * @property {Array<string>} [req.params.role] - Role filters for the employees.
 * @property {Array<string>} [req.params.techStack] - Tech stack filters for the employees.
 * @property {Array<string>} [req.params.industry] - Industry filters for the employees.
 * @property {string} req.params.field - The field to sort the results by.
 * @property {string} req.params.order - The order of sorting, can be 'asc' or 'desc'.
 * @property {number} req.params.page - The page number of results to return.
 * @property {number} req.params.limit - The number of results to return per page.
 * 
 * @returns {Object} - The search results, including the employees and the total number of results.
 * 
 * @throws {404} - If no employees are found.
 */

export async function SearchEmployeeController(req, res) {
  const startTime = Date.now();
  let { query, location, role, techStack, industry, field, order, page = 1, limit = 9 } = req.query;
  
  try {
    const where = {};
    const cacheKey = setKeyValue(
      'searchEmployee',
      query,
      Array.isArray(location) ? location.join(',') : location,
      Array.isArray(role) ? role.join(',') : role,
      Array.isArray(techStack) ? techStack.join(',') : techStack,
      Array.isArray(industry) ? industry.join(',') : industry,
      field,
      order,
      page,
      limit
    );

 
    const cached = await getCache(cacheKey);
    
    if (cached) {
      console.log('Cache hit for SearchEmployeeController', query);
      const queryTime = Date.now() - startTime;
      
      return res.json({
        // success: true,
        employees: cached.employees,
        total: cached.total,
        pageCount: cached.pageCount,
        performance: {
          queryTime: `${queryTime}ms`,
          cached: true,
          count: cached,
          searchTerm: cacheKey
        }
      });
    }

    if(query){
      where.OR = [
        {name: {contains: query, mode: 'insensitive'}},
        {surname: {contains: query, mode: 'insensitive'}},
        {company: {contains: query, mode: 'insensitive'}},
        { user : { email: {contains: query, mode: 'insensitive'}}},
      ]
    }

    if (location?.length) {
      if(typeof location === 'string') {
        location = [location]
      }
      where.location = { 
        in: location 
      }
    }

    if (role?.length) {
      if(typeof role === 'string') {
        role = [role]
      }
      where.role = { 
        in: role 
      }
    }

    if (techStack?.length) {
      if(typeof techStack === 'string') {
        techStack = [techStack]
      }

      where.techStack = {
        some: {
          techStack: {
            name: {
              in: techStack 
            }
          }
        }
      }
    }

    const orderBy = {}

    if (field && order) {
      orderBy[field] = order
    } else {
      orderBy.createdAt = 'desc'
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: Number(limit),
        select: {
          id: true,
          name: true,
          surname: true,
          photoUrl: true,
          department: true,
          email: true,
          bio: true,
          experience: true,
          availability: {
            select: {
              available: true,
            },
          },
          linkedIn: true,
          github: true,
          role: true,
          career: {
              select:{
                  role: true,
                  company: true,
                  duration: true,
                  
              },
          },
          education: {
            select: {
              institution: true,
              qualification: true,
            },
          },
          certificates: {
            select: {
              name: true,
              institution: true,
            },
          },
          location: true,
          softSkills: {
            select: {
              skillsRating: true,
              softSkill: true,
              softSkillId: true,
            },
          },
          techStack: {
            select: {
              Techrating: true,
              techStack: {
                select: {
                  name: true,
                },
              },
            },
          },
          projects: {
            select: {
              project: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  members: {
                    select: {
                      employee: {
                        select: {
                          name: true,
                          photoUrl: true,
                        },
                      },
                    },
                  },
                  techStack: {
                    select: {
                      techStack: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                  github: true,
                  demo: true,
                  screenshot: true,
                  createdAt: true,
                  updatedAt: true,
                  industries: {
                    select: {
                      project: {
                        select: {
                          industries: {
                            select: {
                              industry: {
                                select: {
                                  name: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          testimonials: {
            select: {
              quote: true,
              company: true,
              reference: true,
            },
          },
        },
      }),
      prisma.employee.count({ where }),
    ]);
    
    if (!employees) {
      return res.status(404).send({ message: "Employees not found" });
    }

    const pageCount = Math.ceil(total / limit);

    const responseData ={
      employees,
      total,
      pageCount
    };
    
    // Cache the results (this was missing proper implementation)
    await setCache(cacheKey, responseData, 30 * 60);

    return res.send(responseData);
    
  } catch (error) {
    console.error('Search employees error:', error);
    return res.status(500).json({ error: 'Failed to search employees' });
  }
}
