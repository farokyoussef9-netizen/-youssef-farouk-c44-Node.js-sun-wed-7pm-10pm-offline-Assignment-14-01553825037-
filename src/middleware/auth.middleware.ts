import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/Token";
import { UserRebository } from "../model/user/user.Rebository";
import { NotFoundException } from "../utils";
export const isAuthenticated=()=>{
   
    return async(req:Request,res:Response,next:NextFunction)=>{
        const token= req.headers["authorization"] as string; 
        const payload=verifyToken(token);
        const userRebository  =new UserRebository();
        const user=await userRebository.exist({_id:payload._id})
        if(!user){
            throw new NotFoundException("User not found");
        }
        req.user=user;
      
        next();
        }
}