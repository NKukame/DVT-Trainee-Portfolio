// searchController.js - REPLACE YOUR ENTIRE FILE WITH THIS
import prisma, { generateKey, redis } from "../lib/prisma-redis-middleware.js";
import { getCache, setCache } from "../lib/prisma-redis-middleware.js";

// ================================
// CORE SEARCH LOGIC (EXTRACTED FROM YOUR CONTROLLERS)
// ================================

/**
 * Core Project Search Logic - Pure function with no HTTP handling
 * This contains your exact same search logic, just extracted
 */
export async function executeProjectSearch(searchParams) {
  const {
    query,
    industries,
    techStack,
    field,
    order,
    page = 1,
    limit = 9,
  } = searchParams;

  const where = {};

  // Your exact same query building logic
  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (industries?.length) {
    const industriesArray =
      typeof industries === "string" ? [industries] : industries;
    where.industry = {
      some: {
        in: industriesArray,
      },
    };
  }

  if (techStack?.length) {
    const techStackArray =
      typeof techStack === "string" ? [techStack] : techStack;
    where.techStack = {
      some: {
        techStack: {
          name: {
            in: techStackArray,
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

  // Your exact same database query
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

  return {
    projects,
    total,
    pageCount: Math.ceil(total / limit),
    currentPage: parseInt(page),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };
}

/**
 * Core Employee Search Logic - Pure function with no HTTP handling
 * This contains your exact same search logic, just extracted
 */
export async function executeEmployeeSearch(searchParams) {
  const {
    query,
    location,
    role,
    techStack,
    industry,
    field,
    order,
    page = 1,
    limit = 9,
  } = searchParams;

  const where = {};

  // Your exact same query building logic
  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { surname: { contains: query, mode: "insensitive" } },
      { company: { contains: query, mode: "insensitive" } },
      { user: { email: { contains: query, mode: "insensitive" } } },
    ];
  }

  if (location?.length) {
    const locationArray = typeof location === "string" ? [location] : location;
    where.location = { in: locationArray };
  }

  if (role?.length) {
    const roleArray = typeof role === "string" ? [role] : role;
    where.role = { in: roleArray };
  }

  if (techStack?.length) {
    const techStackArray =
      typeof techStack === "string" ? [techStack] : techStack;
    where.techStack = {
      some: {
        techStack: {
          name: { in: techStackArray },
        },
      },
    };
  }

  if (industry?.length) {
    const industryArray = typeof industry === "string" ? [industry] : industry;
    where.industry = {
      some: { in: industryArray },
    };
  }

  const orderBy = {};
  if (field && order) {
    orderBy[field] = order;
  } else {
    orderBy.createdAt = "desc";
  }

  // Your exact same database query
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
          select: {
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

  const pageCount = Math.ceil(total / limit);
  return {
    employees,
    total,
    pageCount,
    currentPage: parseInt(page),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };
}

// ================================
// CACHED SEARCH SERVICES (WRAPPER FUNCTIONS)
// ================================

/**
 * Cached Project Search - Used by controller AND cache warming
 */
export async function cachedProjectSearch(searchParams, cacheTTL = 30 * 60) {
  const { query, industries, techStack, field, order, page = 1 } = searchParams;

  // Use your existing generateKey function
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
    industries
  );

  // Check cache using your existing function
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log(`🎯 Cache HIT: ${cacheKey}`);
    return { data: cached, cacheHit: true, cacheKey };
  }

  console.log(`❌ Cache MISS: ${cacheKey}`);

  // Execute search using extracted logic
  const result = await executeProjectSearch(searchParams);

  // Use shorter TTL for filtered searches, longer for general
  const finalCacheTTL = query || industries || techStack ? 15 * 60 : cacheTTL;
  await setCache(cacheKey, result, finalCacheTTL);

  return { data: result, cacheHit: false, cacheKey };
}

/**
 * Cached Employee Search - Used by controller AND cache warming
 */
export async function cachedEmployeeSearch(searchParams, cacheTTL = 30 * 60) {
  const {
    query,
    location,
    role,
    techStack,
    industry,
    field,
    order,
    page = 1,
  } = searchParams;

  const cacheKey = await generateKey(
    "employees",
    query,
    location,
    role,
    techStack,
    industry,
    field,
    order,
    page,
    undefined
  );

  const cached = await getCache(cacheKey);
  if (cached) {
    console.log(`🎯 Cache HIT: ${cacheKey}`);
    return { data: cached, cacheHit: true, cacheKey };
  }

  console.log(`❌ Cache MISS: ${cacheKey}`);

  const result = await executeEmployeeSearch(searchParams);

  const hasFilters = query || location || role || techStack || industry;
  const finalCacheTTL = hasFilters ? 15 * 60 : cacheTTL;
  await setCache(cacheKey, result, finalCacheTTL);

  return { data: result, cacheHit: false, cacheKey };
}

// ================================
// YOUR EXISTING CONTROLLERS (IMPROVED BUT SAME API)
// ================================

/**
 * Search for projects - SAME API, IMPROVED PERFORMANCE
 * Maintains your exact same response format and error handling
 */
export async function SearchProjectController(req, res) {
  try {
    // Add cache headers for client-side caching
    res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600");

    // Use the cached search service
    const {
      data: result,
      cacheHit,
      cacheKey,
    } = await cachedProjectSearch(req.query);

    // Add debugging headers
    res.set("X-Cache", cacheHit ? "HIT" : "MISS");
    res.set("X-Cache-Key", cacheKey);

    // Your exact same error handling
    if (!result.projects) {
      return res.status(404).send({ message: "Projects not found" });
    }

    // Your exact same response format
    return res.send({ projects: result.projects, total: result.total });
  } catch (error) {
    console.error("Search projects error:", error);
    return res.status(500).json({ error: "Failed to search projects" });
  }
}

/**
 * Search for employees - SAME API, IMPROVED PERFORMANCE
 * Maintains your exact same response format and error handling
 */
export async function SearchEmployeeController(req, res) {
  try {
    res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600");

    const {
      data: result,
      cacheHit,
      cacheKey,
    } = await cachedEmployeeSearch(req.query);

    res.set("X-Cache", cacheHit ? "HIT" : "MISS");
    res.set("X-Cache-Key", cacheKey);

    // Your exact same error handling
    if (!result.employees) {
      return res.status(404).send({ message: "Employees not found" });
    }

    // Your exact same response format
    return res.send({
      employees: result.employees,
      total: result.total,
      pageCount: result.pageCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to search employees" });
  }
}

// ================================
// CACHE WARMING FUNCTIONS
// ================================

/**
 * Efficient Cache Warming - Reuses the same functions as controllers
 */
export async function warmCache(searchQueries = []) {
  console.log("🔥 Starting cache warming...");

  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;
  const results = [];

  for (const searchQuery of searchQueries) {
    try {
      let result;

      if (searchQuery.type === "projects") {
        const { data, cacheHit, cacheKey } = await cachedProjectSearch(
          searchQuery,
          60 * 60 // 1 hour TTL for warmed cache
        );
        result = {
          type: "projects",
          cacheKey,
          cacheHit,
          resultCount: data.total,
        };
      } else if (searchQuery.type === "employees") {
        const { data, cacheHit, cacheKey } = await cachedEmployeeSearch(
          searchQuery,
          60 * 60 // 1 hour TTL for warmed cache
        );
        result = {
          type: "employees",
          cacheKey,
          cacheHit,
          resultCount: data.total,
        };
      }

      if (result) {
        results.push(result);
        if (result.cacheHit) {
          console.log(`♨️ Already warm: ${result.cacheKey}`);
        } else {
          console.log(
            `🔥 Warmed: ${result.cacheKey} (${result.resultCount} results)`
          );
        }
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Failed to warm:`, searchQuery, error.message);
      errorCount++;
    }
  }

  const duration = Date.now() - startTime;
  console.log(
    `🏁 Cache warming completed: ${successCount} success, ${errorCount} errors in ${duration}ms`
  );

  return {
    success: successCount,
    errors: errorCount,
    duration: duration,
    results: results,
  };
}

/**
 * Essential Cache Warming - Most important searches
 */
export async function warmEssentialCache() {
  const essentialSearches = [
    // Homepage loads - MOST CRITICAL
    { type: "projects", page: 1, limit: 9 },
    { type: "employees", page: 1, limit: 9 },

    // Popular tech searches (customize based on your data)
    { type: "projects", techStack: ["React"], page: 1, limit: 9 },
    { type: "projects", techStack: ["JavaScript"], page: 1, limit: 9 },
    { type: "projects", techStack: ["Node.js"], page: 1, limit: 9 },
    { type: "projects", techStack: ["Python"], page: 1, limit: 9 },

    // Popular employee searches
    { type: "employees", techStack: ["React"], page: 1, limit: 9 },
    { type: "employees", techStack: ["JavaScript"], page: 1, limit: 9 },
    { type: "employees", role: ["Software Engineer"], page: 1, limit: 9 },
    { type: "employees", role: ["Frontend Developer"], page: 1, limit: 9 },
    { type: "employees", location: ["Remote"], page: 1, limit: 9 },

    // Second pages (users browse further)
    { type: "projects", page: 2, limit: 9 },
    { type: "employees", page: 2, limit: 9 },
  ];

  return await warmCache(essentialSearches);
}

/**
 * Smart Cache Warming - Time-based patterns
 */
export async function smartCacheWarming() {
  const hour = new Date().getHours();

  // Morning rush (8-10 AM)
  if (hour >= 8 && hour <= 10) {
    console.log("🌅 Morning cache warming...");
    const morningSearches = [
      { type: "employees", location: ["Remote"], page: 1, limit: 9 },
      { type: "employees", role: ["Software Engineer"], page: 1, limit: 9 },
      { type: "projects", techStack: ["React"], page: 1, limit: 9 },
      { type: "projects", page: 1, limit: 9 },
      { type: "employees", page: 1, limit: 9 },
    ];
    return await warmCache(morningSearches);
  }

  // Business hours (10 AM - 6 PM)
  if (hour >= 10 && hour <= 18) {
    console.log("☀️ Business hours cache warming...");
    return await warmEssentialCache();
  }

  // Evening/night - light warming
  console.log("🌙 Evening cache warming...");
  const lightSearches = [
    { type: "projects", page: 1, limit: 9 },
    { type: "employees", page: 1, limit: 9 },
  ];
  return await warmCache(lightSearches);
}
