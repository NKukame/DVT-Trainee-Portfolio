import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function UpdateProfileController(req, res){
  const { name } = req.params;
  const { email, username } = req.body;
  if(name === "remow@gmail.com" ){
    // const person = await prisma.user.findUnique({
    //   where: { email },
    // });
   const person = await prisma.user.update({
    where: { email: email },
    data: { name:username }, // Yes, you should hash this
  });
    res.send(person);
  } else 
{  


    return res.status(400).send("Couldn't Update profile");
}}
