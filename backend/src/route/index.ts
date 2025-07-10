// routes/index.ts
import express from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";

const r = express.Router();

console.log("🔁 Registering /auth and /user routes");

r.use("/auth", authRoute);
r.use("/user", userRoute); // ✅ No passport.authenticate here

export default r;
