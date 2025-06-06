import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config({ path: "../.env" });
const prisma = new PrismaClient();

export default async function signup(req, res){
try{
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempObj = { email, password: hashedPassword };
  const user = await prisma.user.create({
   data: tempObj,
 })
 res.status(201).json(user);

}catch(err){
  return res.status(400).send({message:"signup failed"})
}
// Store the user object in the database
 // …
};


