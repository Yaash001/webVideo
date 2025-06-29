import { Iuser } from "../model/userSchema";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const genrateToken = async(user : Iuser) : Promise<string>=>{
const secretOrKey=process.env.JWT_SECRET_KEY as string
const Token = await jwt.sign(user.toJSON(),secretOrKey,{expiresIn:"6h"});
return Token
}