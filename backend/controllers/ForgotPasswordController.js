import prisma from "../lib/prisma-redis-middleware.js"
export default function forgotPassword(req, res){
  return res.send("forgot password")
}
