import express from "express";
const app = express();
import connectDb from "./config/db";
import dotenv from 'dotenv';


dotenv.config();

const p = process.env.PORT || 8080
connectDb();
app.listen(p,()=>{
    console.log(`Listeing on port ${p}`);
})
