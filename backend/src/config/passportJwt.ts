import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy,ExtractJwt, StrategyOptions } from 'passport-jwt'
import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import User from '../model/userSchema';

dotenv.config();
const opts :StrategyOptions ={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET_KEY as string
}
passport.use(new Strategy(opts,async(JwtPayload,done)=>{
    try {
        const user = await User.findById(JwtPayload._id).select("-password");
        if(!user) return done(null,false);
        return done(null,user);
    } catch (error)
    {
        console.error(`Error in JWT ${error}`);
        return done(error)
    }
}

))

export default passport

