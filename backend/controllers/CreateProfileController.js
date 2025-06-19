import prisma from "../lib/prisma-redis-middleware.js";
export function createProfileController(req, res){
  return res.send({message:"profile creation"});
  
}
