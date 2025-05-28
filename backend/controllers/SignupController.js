import bcrypt from 'bcryptjs';


export async function register(req, res){
  // return res.send('/register');

  console.log('Registering user:', req.body);
 const { name, email, password } = req.body;
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);
 const tempOUbj = { name, email, password: hashedPassword };
// Store the user object in the database
 // …
res.status(201).json(tempOUbj);
};

<<<<<<< HEAD:backend/controllers/RegisterController.js
=======
export default function signup(req, res){
  return res.send('/signup')
}
>>>>>>> 951db540789b6492e16e551763347f31637e7f60:backend/controllers/SignupController.js
