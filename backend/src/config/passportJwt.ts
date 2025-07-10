import { Request, RequestHandler, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from "../model/userSchema";
import { Types } from "mongoose";

dotenv.config();

export type AuthenticateReqHandler = RequestHandler<any, any, any, any, AuthenticateReq>;

export interface AuthenticateReq extends Request {
  user: {
    _id: Types.ObjectId;
  };
}

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY ?? "", // ✅ fallback
};

console.log("VERIFYING with JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY); // ✅ debug

passport.use(
  new Strategy(opts, async (JwtPayload: any, done) => {
    try {
      console.log("JWT Payload:", JwtPayload); // ✅ debug
      const user = await User.findById(JwtPayload._id).select("-password");
      if (!user) {
        console.log("User not found for given JWT");
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.error(`Error in JWT strategy: ${error}`);
      return done(error, false);
    }
  })
);

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: Error | null, user: any, info: any) => {
    if (err || !user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default passport;
