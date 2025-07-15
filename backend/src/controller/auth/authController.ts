import { Request, RequestHandler } from "express"
import User from "../../model/userSchema";
import { sendResponse } from "../../utils/sendResponse";
import crypto from 'crypto'
import { hashpass } from "../../utils/passwordHasher";
import { comparePass } from "../../utils/passwordHasher";
import { genrateToken } from './../../utils/genrateToken';
interface RegisterReq extends Request{
    body:{
        email:string,
        password: string,
    }
}


export const signUpUser : RequestHandler = async(req : RegisterReq,res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return sendResponse(res, 400, false, "Email is already registered");
    }

    const hashpassword = await hashpass(password);
    const newUser = await User.create({
      email: normalizedEmail,
      password: hashpassword,
      token: crypto.randomBytes(16).toString("hex"),
    });

    return sendResponse(res, 200, true, "User Created Successfully", {
      user: newUser,
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

export const signInUser: RequestHandler = async (req: RegisterReq, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return sendResponse(res, 404, false, "Accout Doesnt Exist");
    }

    const matched = await comparePass(password, existingUser.password);
    if (!matched) {
      return sendResponse(res, 404, false, "invalid credentials");
    }

    const Token = await genrateToken(existingUser);
    return sendResponse(res, 200, true, "Logged in Sucessfully", {
      user: { token: Token },
    });
  } catch (error) {
    console.error(`Error While Signing In ... ${error}`);
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};
