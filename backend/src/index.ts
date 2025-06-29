import express from "express";
const app = express();
import connectDb from "./config/db";
import dotenv from 'dotenv';
import routes from './route/index'
import passportJwt from './config/passportJwt'
import passport from "./config/passportJwt";


dotenv.config();
const p = process.env.PORT || 8080
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
connectDb();

app.use('/api/v1',routes)
app.listen(p,()=>{
    console.log(`Listeing on port ${p}`);
})
