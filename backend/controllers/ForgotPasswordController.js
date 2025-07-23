// import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
// const prisma = new PrismaClient();
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
     user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendResetEmail(to, token) {
  const resetLink = `http://localhost:5173/forgot-password?token=${token}`;
  return transporter.sendMail({
    from: "majavvuadrian@gmail.com",
    to,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
  });
}

function createResetToken(userId) {
  return jwt.sign({ userId, purpose: 'reset' }, process.env.JWT_SECRET, {
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

  // await prisma.user.update({
  //   where: { id: payload.userId },
  //   data: { password: newPassword }, // Yes, you should hash this
  // });

  res.status(200).json({ message: 'Password reset successfully' });
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  // const user = await prisma.user.findUnique({ where: { email } });
  const user = { id: 2, email: 'dthabang919@gmail.com' };

  if (user) {
    try{
    const token = createResetToken(user.id);
    await sendResetEmail(email, token);
    res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
}else{
  res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
}

}
export default forgotPassword;
export { resetPassword, sendResetEmail, createResetToken, verifyResetToken };