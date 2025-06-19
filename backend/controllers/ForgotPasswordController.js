import prisma from "../lib/prisma-redis-middleware.js"
export async function forgotPassword(req, res){
  return res.send("forgot password")
}
