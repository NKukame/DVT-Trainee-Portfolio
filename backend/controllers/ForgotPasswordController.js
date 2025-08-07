import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Simple Gmail configuration
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
    from: process.env.EMAIL_USER,
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
  
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }
  
  const payload = verifyResetToken(token);

  if (!payload) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  try {
    // TODO: Hash the password before storing
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id: payload.userId },
      data: { password: newPassword },
    });

    console.log(`Password reset successfully for user ID: ${payload.userId}`);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  
  try {
    // Look up user in database
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      console.log(`Found user: ${user.email} (ID: ${user.id})`);
      console.log(`Sending password reset email TO: ${email}`);
      console.log(`Email will be sent FROM: ${process.env.EMAIL_USER}`);
      
      const token = createResetToken(user.id);
      await sendResetEmail(email, token);
      res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
    } else {
      console.log(`No user found with email: ${email}`);
      // Still send success message for security (don't reveal if user exists)
      res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
    }
  } catch (error) {
    console.error('Database or email error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
}

export default forgotPassword;
export { resetPassword, sendResetEmail, createResetToken, verifyResetToken };