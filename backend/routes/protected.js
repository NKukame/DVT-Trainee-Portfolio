import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "This is protected content",
    user: req.user, 
    
  });
});

export default router;
