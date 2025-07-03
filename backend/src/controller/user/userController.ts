import { AuthenticateReqHandler } from "../../config/passportJwt";
import User from "../../model/userSchema";
import { sendResponse } from "../../utils/sendResponse";

export const getDetails : AuthenticateReqHandler = async(req,res)=>{
    try {
        if(req.user instanceof User) {
            const userId= req.user._id
            if(!userId){return sendResponse(res,400,false,"Signin To Continue...")}
        
            const user =  await User.findById(userId).select("-password")
            if(!user){
                return sendResponse(res,400,false,"User Not Exist")
            }
            return sendResponse(res,200,true,"User Fetch Sucess...",{user})
        }
        
    } catch (error) {
        console.error(`Server not abel to send details ${error}`)
        sendResponse(res,500,false,"Internal Server error")
    }

}