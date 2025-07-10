// routes/userRoute.ts
import express from "express";
import { changePassword, getDetails, getEmailOnly, updateProfile } from "../controller/user/userController";
import { isAuthenticated } from "../middleware/isAuthenticated";

const r = express.Router();

// Add logging middleware to confirm route is reached
r.use((req, res, next) => {
  console.log(`📥 Incoming request to /user${req.path}`);
  next();
});

r.get("/profile", isAuthenticated, getEmailOnly);
r.get("/details", isAuthenticated, getDetails); 
r.put("/updateprofile", isAuthenticated, updateProfile);
r.post("/change-password", isAuthenticated, changePassword);

export default r;
