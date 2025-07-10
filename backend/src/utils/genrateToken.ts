import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Iuser } from "../model/userSchema";

dotenv.config();

export const genrateToken = async (user: Iuser): Promise<string> => {
  const payload = {
    _id: user._id,
    email: user.email
  };

  const secret = process.env.JWT_SECRET_KEY!;
  console.log("SIGNING with JWT_SECRET_KEY:", secret); // must match during verify
  const token = jwt.sign(payload, secret, { expiresIn: "6h" });
  return token;
};
