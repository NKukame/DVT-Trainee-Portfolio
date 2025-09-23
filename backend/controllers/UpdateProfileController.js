import prisma from "../lib/prisma-redis-middleware.js";


export async function UpdateProfileController(req, res){
  const { name } = req.params;
  const { email, username, newEmail } = req.body;
  if(name  ){
    // const person = await prisma.user.findUnique({
    //   where: { email },
    // });
   const person = await prisma.user.update({
    where: { email: email },
    data: { email:newEmail }, // Yes, you should hash this
  });
    res.send(person);
  } else 
{  


    return res.status(400).send("Couldn't Update profile");
}}
