import prisma from "../lib/prisma-redis-middleware.js";
export async function deleteProjectController(req, res){
  return res.send("delete project controller")
}


export async function deleteProfileController(req, res){
  
  const { id, email } = req.params;
  
  const deletedProfile = await prisma.user.delete({    
    where: { email: email },
    select: {email: true}
})

  return res.send( {message: "deleted", deletedProfile})

}
