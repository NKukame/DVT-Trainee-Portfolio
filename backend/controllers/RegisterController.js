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

