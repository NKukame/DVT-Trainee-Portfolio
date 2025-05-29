import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
 
export async function SearchEmployeeController(req, res)  {
  const { name } = req.params;

  const user = await prisma.user.findFirst({
      where: { name },
    });

  if (!user) {
    return res.status(404).send({ message: 'Employee not found' });
  }

  res.send(user);
};

export async function SearchProjectController(req, res) {
  const { name } = req.params;

  const selectedProject = await prisma.project.findFirst({
      where: { name }
  })
  
    if (!selectedProject) {
    return res.status(404).send({ message: 'Project not found' });
  }

  res.send(selectedProject);
}
