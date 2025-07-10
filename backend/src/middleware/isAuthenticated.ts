import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userSchema";

interface AuthRequest extends Request {
  user?: any;
}

export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("🔒 No or invalid Authorization header.");
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
      console.error("🚨 JWT_SECRET_KEY is not defined in environment");
      res.status(500).json({ success: false, message: "Server error" });
      return;
    }

    console.log("🔐 Verifying token with secret:", secret);
    const decoded = jwt.verify(token, secret) as { _id: string };

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      console.warn("👤 User not found for token:", decoded._id);
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }
    console.log("🔐 Verifying token with secret:", secret);
    console.log("✅ Authenticated user:", user.email || user._id);
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
