/**
 * Login route handler.
 *
 * This endpoint will handle user authentication once the logic is implemented.
 * It will validate user credentials (e.g., email and password) sent in the request body,
 * authenticate the user against the database, and return a JWT token.
 *
 * Note: This is currently a placeholder and does not perform any authentication.
 *
 * @param {import('express').Request} req - Express request object, expected to contain user credentials in the body.
 * @param {import('express').Response} res - Express response object, used to send status and data back to the client.
 * @returns {Response} Sends a response indicating the route is active.
 */

import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

config({ path: "../.env" });


const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

export default async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Incorrect email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      // user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed", detail: err.message });
  }
}
