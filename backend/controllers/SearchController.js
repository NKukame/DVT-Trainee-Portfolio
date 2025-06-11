import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function SearchProjectController(req, res) {
  const {query, filters={}, sort, page = 1, limit = 10 } = req.params;

  const where = {}

  if(query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ]
  }

  if (filters.industries?.length){
    where.industry = { 
      some: {
        in: filters.industries 
      }
    }
  }

  if (filters.projectTechStack?.length){
    where.techStack = { 
      some: {
        in: filters.projectTechStack 
      }
    }
  }

  const orderBy = {}

  if (sort) {
    orderBy[sort.field] = sort.order
  }else {
    orderBy.createdAt = 'desc'
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        industries: true,
        techStack: true,
        members: {
          include: {
            employee: true
          }
        }
      }
    }),
    prisma.project.count({ where })
  ]);

  if (!projects) {
    return res.status(404).send({ message: "Projects not found" });
  }

  return res.send({ projects, total });



  }

