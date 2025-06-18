import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function HomePortfolioController(req, res){
  
  const users = await prisma.employee.findMany({
    select:{
      name:true,
      photoUrl:true,
      email:true,
      bio:true,
      linkedIn:true,
      github:true,
      techStack:{
        select:{
          techStack:{
            select:{
              name:true,
            }
          }
        }
      }  
    }
  })

  return res.send(users);
}

export async function HomeProjectController(req, res){ 
  const employees = await prisma.project.findMany();

  return res.send(employees);
}

