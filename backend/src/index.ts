import express from "express";
const app = express();
import connectDb from "./config/db";
import dotenv from 'dotenv';
import routes from './route/index'

dotenv.config();
const p = process.env.PORT || 8080
app.use(express.json());
app.use(express.urlencoded({extended:true}))

connectDb();

app.use('/api/v1',routes)
app.listen(p,()=>{
    console.log(`Listeing on port ${p}`);
})
