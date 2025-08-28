import bcrypt from 'bcryptjs';
import { config } from "dotenv";
config({ path: "../.env" });
import prisma from '../lib/prisma-redis-middleware.js';

export default async function signup(req, res){
try{
  const {  email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempObj = {  email, password: hashedPassword };
  const user = await prisma.user.create({
   data: tempObj,
 })
 const user_id =  user.id
 res.status(201).json(user, user_id);
 

}catch(err){
  return res.status(400).send({message:"signup failed"})
}
// Store the user object in the database
 // …
//  const { name, email, password } = req.body;
//  const salt = await bcrypt.genSalt(10);
//  const hashedPassword = await bcrypt.hash(password, salt);
//  const tempUser = { name, email, password: hashedPassword };
//  const user = await prisma.user.create({
//   data: tempUser,
// })

// res.status(201).json(user);
};


