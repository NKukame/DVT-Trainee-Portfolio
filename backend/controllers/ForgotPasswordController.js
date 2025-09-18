import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Gmail configuration
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || process.env.EMAIL_USER,
    pass: process.env.GMAIL_PASS || process.env.EMAIL_PASS, 
  },
});

// Outlook configuration
const outlookTransporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS,
  },
});

// Generic email sending function
async function sendEmail(transporter, mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
// Call the functions to send emails
// sendToGmail();
// sendToOutlook();

// Enhanced reset email function with provider selection
async function sendResetEmail(to, token, provider = 'gmail') {
  const resetLink = `http://192.168.1.65:5173/forgot-password?token=${token}`;
  
  const mailOptions = {
    from: provider === 'gmail' 
      ? (process.env.GMAIL_USER || process.env.EMAIL_USER)
      : process.env.OUTLOOK_USER,
    to,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
  };

  // Select transporter based on provider
  const transporter = provider === 'outlook' ? outlookTransporter : gmailTransporter;
  
  return await sendEmail(transporter, mailOptions);
}

// Send to Gmail specifically
async function sendResetEmailGmail(to, token) {
  const resetLink = `http://localhost:5173/forgot-password?token=${token}`;
  
  const gmailOptions = {
    from: process.env.GMAIL_USER || process.env.EMAIL_USER,
    to,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
  };

  return await sendEmail(gmailTransporter, gmailOptions);
}

// Send to Outlook specifically  
async function sendResetEmailOutlook(to, token) {
  const resetLink = `http://localhost:5173/forgot-password?token=${token}`;
  
  const outlookOptions = {
    from: process.env.OUTLOOK_USER,
    to,
    subject: 'Password Reset', 
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
  };

  return await sendEmail(outlookTransporter, outlookOptions);
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
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: payload.userId },
      data: { password: hashedPassword },
    });

    console.log(`Password reset successfully for user ID: ${payload.userId}`);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}

async function forgotPassword(req, res) {
  const { email, provider = 'gmail' } = req.body; 

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      console.log(`Found user: ${user.email} (ID: ${user.id})`);
      console.log(`Sending password reset email TO: ${email} via ${provider}`);
      
      const senderEmail = provider === 'outlook' 
        ? process.env.OUTLOOK_USER 
        : (process.env.GMAIL_USER || process.env.EMAIL_USER);
      
      console.log(`Email will be sent FROM: ${senderEmail}`);
      
      const token = createResetToken(user.id);
      const result = await sendResetEmail(email, token, provider);
      
      if (result.success) {
        res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
      } else {
        // Try alternative provider if first one fails
        const fallbackProvider = provider === 'gmail' ? 'outlook' : 'gmail';
        console.log(`Retrying with ${fallbackProvider} provider...`);
        
        const fallbackResult = await sendResetEmail(email, token, fallbackProvider);
        
        if (fallbackResult.success) {
          res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
        } else {
          throw new Error('Failed to send email with both providers');
        }
      }
    } else {
      console.log(`No user found with email: ${email}`);
      res.status(200).json({ message: 'If that email exists, a reset link was sent.' });
    }
  } catch (error) {
    console.error('Database or email error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
}

export default forgotPassword;
export { 
  resetPassword, 
  sendResetEmail, 
  sendResetEmailGmail,
  sendResetEmailOutlook,
  createResetToken, 
  verifyResetToken 
};