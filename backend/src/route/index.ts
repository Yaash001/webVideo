import express from "express";
import authRoute from "./authRoute";
import passport from "passport";
import userRoute from './userRoute'
const r = express.Router();
r.use("/auth",authRoute)
r.use("/user",passport.authenticate("jwt",{session:false}),
userRoute)


export default r;
