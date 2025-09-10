import prisma, { generateKey, redis } from "../lib/prisma-redis-middleware.js";
import { getCache, setCache } from "../lib/prisma-redis-middleware.js";

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

export async function SearchProjectController(req, res) {
  let {
    query,
    industries,
    techStack,
    field,
    order,
    page = 1,
    limit = 9,
  } = req.query; // Changed from req.params to req.query

  if (techStack) {
    techStack = JSON.parse(techStack);
  }

  if (industries) {
    industries = JSON.parse(industries);
  }

  try {
    const where = {};
    const cacheKey = await generateKey(
      "projects",
      query,
      undefined,
      undefined,
      techStack,
      undefined,
      undefined,
      order,
      page,
      industries,
    );



    // const cached = await getCache(cacheKey);
    // if (cached) {
    //   return res.status(200).send(cached);
    // }

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (industries?.length) {
      if (typeof industries === "string") {
        industries = [industries];
      }
      where.industry = {
        some: {
          in: industries,
        },
      };
    }

    if (techStack?.length) {
      if (typeof techStack === "string") {
        techStack = [techStack];
      }
      where.techStack = {
        some: {
          techStack: {
            name: {
              in: techStack,
            },
          },
        },
      };
    }

    const orderBy = {};

    if (order && field) {
      orderBy[field] = order;
    } else {
      orderBy.createdAt = "desc";
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
                  photoUrl: true,
                },
              },
            },
          },
          industries: {
            select: {
              industry: true,
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
        },
      }),
      prisma.project.count({ where }),
    ]);

    if (!projects) {
      return res.status(404).send({ message: "Projects not found" });
    }
    await setCache(cacheKey, { projects, total }, 30 * 60);
    const pageCount = Math.ceil(total / limit);
    return res.send({ projects, total, pageCount });
  } catch (error) {
    console.error("Search projects error:", error);
    return res.status(500).json({ error: "Failed to search projects" });
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
  let {
    query,
    experience,
    location,
    role,
    techStack,
    isAvailable,
    industry,
    field,
    order,
    page = 1,
    limit = 9,
  } = req.query; // Changed from req.params to req.query
if (location) {
  location = JSON.parse(location);
}
if (role) {
  role = JSON.parse(role);
}
if (techStack) {
  console.log(techStack);
  techStack = JSON.parse(techStack);
}
if (industry) {
  industry = JSON.parse(industry);
}

if (experience) {
  experience = JSON.parse(experience);
}

if (isAvailable) {
  isAvailable = JSON.parse(isAvailable);
}

  try {
    const where = {};
    const cacheKey = await generateKey(
      "employees",
      query,
      location,
      role,
      techStack,
      industry,
      experience,
      isAvailable,
      field,
      order,
      page,
      undefined,
    );
    // const cached = await getCache(cacheKey);
    // if (cached) {
    //   return res.status(200).send(cached);
    // }

    

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { surname: { contains: query, mode: "insensitive" } },
        { company: { contains: query, mode: "insensitive" } },
        { user: { email: { contains: query, mode: "insensitive" } } },
      ];
    }

    if (location?.length) {
      if (typeof location === "string") {
        location = [location];
      }
      where.location = {
        in: location,
      };
    }
    
    if (experience?.length) {
      if (typeof experience === "string") {
        experience = [experience];
      }
      where.experience = {
        in: experience,
      };
    }
    
    if (role?.length) {
      if (typeof role === "string") {
        role = [role];
      }

      role = role.map((role) => role.toUpperCase().split(" ").join("_"));
      where.role = {
        in: role,
      };
    }

    if (techStack?.length) {
      
      if (typeof techStack === "string") {
        techStack = [techStack];
      }

      

      where.techStack = {
        some: {
          techStack: {
            name: {
              in: techStack,
            },
          },
        },
      };
    }

    if (industry?.length) {
      if (typeof industry === "string") {
        industry = [industry];
      }
      where.industry = {
        some: {
          in: industry,
        },
      };
    }

    // console.log(where);
    const orderBy = {};


    if (isAvailable) {
      where.availability = {
        available: isAvailable,
      };
    }

    if (field && order) {
      orderBy[field] = order;
    } else {
      orderBy.createdAt = "desc";
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: Number(limit),

        select: {
          id: true,
          title: true,
          name: true,
          surname: true,
          photoUrl: true,
          department: true,
          user: {
            select: {
              id: true,
            },
          },
          email: true,
          phone: true,
          company: true,
          bio: true,
          experience: true,
          availability: {
            select: {
              available: true,
            },
          },
          linkedIn: true,
          github: true,
          portfolio: true,
          role: true,
          career: {
              select:{
                  id: true,
                  role: true,
                  company: true,
                  duration: true,
                  
              },
          },
          education: {
            select: {
              id: true,
              institution: true,
              qualification: true,
            },
          },
          certificates: {
            select: {
              id: true,
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
                  id: true,
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
              id: true,
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
    } else {
      const pageCount = Math.ceil(total / limit);
      await setCache(cacheKey, { employees, total, pageCount }, 30 * 60);
      return res.send({ employees, total, pageCount });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to search employees" });
  }
}