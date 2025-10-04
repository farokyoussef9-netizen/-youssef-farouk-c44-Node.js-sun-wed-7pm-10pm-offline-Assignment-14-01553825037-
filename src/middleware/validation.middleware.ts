import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../utils/ERROR";
import {ZodType} from "zod"
export const isvalid=(schema:ZodType)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const data={
            ...req.body,    
            ...req.query,
            ...req.params
        }
    const validateData=schema.safeParse(data);
    if(!validateData.success){
        let errmessages=validateData.error.issues.map((issue)=>({
            path:issue.path[0] as string,
            message:issue.message,
           
        }));
        throw new BadRequestException("validation error",errmessages);
    }
   return next();
}
}