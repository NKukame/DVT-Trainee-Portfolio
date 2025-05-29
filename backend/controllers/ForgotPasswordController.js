// const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
// const prisma = new PrismaClient();
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or your SMTP provider
  auth: {
    user:"thabanengobe3@gmail.com",
    pass:  "uzjv eiif zejd orec",
  },
});

function sendResetEmail(to, token) {
  const resetLink = `http://localhost:5173/forgot-password?token=${token}`;
  return transporter.sendMail({
    from: "thabanengobe3@gmail.com",
    to,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
  });
}



function createResetToken(userId) {
  return jwt.sign({ userId, purpose: 'reset' }, "a6056d7c0ceb56f9b6af9a5142ef3be612731812e83cbc9cce84903b17c5d55c", {
    expiresIn: '15m',
  });
}


function verifyResetToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.purpose !== 'reset') throw new Error('Invalid token purpose');
    return payload;
  } catch (err) {
    return null;
  }
}

async function resetPassword(req, res) {
  const { token, newPassword } = req.body;
  const payload = verifyResetToken(token);

  if (!payload) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  await prisma.user.update({
    where: { id: payload.userId },
    data: { password: newPassword }, // Yes, you should hash this
  });

  res.status(200).json({ message: 'Password reset successfully' });
  
}

async function forgotPassword(req, res){
  const { email } = req.body;
  // const user = await prisma.user.findUnique({ where: { email } });
  const user = {id:2, email:'dthabang919@gmail.com'};

  if (user) {
    const token = createResetToken(user.id);
    await sendResetEmail(email, token);
  }

  res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
}

module.exports = forgotPassword;