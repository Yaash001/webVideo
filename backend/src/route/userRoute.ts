import express from "express";
import { getDetails } from "../controller/user/userController";

const r = express.Router();
r.get("/profile",getDetails)

export default r;
