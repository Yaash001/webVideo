import { Response } from "express";

interface ResponseData {
    [key:string]:unknown,
}

export const sendResponse = (res:Response,status:number,sucess:boolean,message:string,data:ResponseData = {})=>{
    res.status(status).send({sucess,message,...data})
}