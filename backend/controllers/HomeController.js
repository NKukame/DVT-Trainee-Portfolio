import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function HomePortfolioController(req, res){
  
  const users = await prisma.user.findMany()

  // const dataTeam = await fetch("/team-portfolio.json");
  res.send(users);
}

export async function HomeProjectController(req, res){ 
  const employees = await prisma.project.findMany();

  return res.send(employees);
}

