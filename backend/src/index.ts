import express from "express";
const app = express();
const corsOpts ={
    origin:["http://localhost:5173"]
}
import cors from 'cors'
import connectDb from "./config/db";
import dotenv from 'dotenv';
import routes from './route/index'
import passportJwt from './config/passportJwt'
import passport from "./config/passportJwt";


dotenv.config();
connectDb();
app.use(cors(corsOpts))



const p = process.env.PORT || 8080
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use('/api/v1',routes)
app.listen(p,()=>{
    console.log(`Listeing on port ${p}`);
})
