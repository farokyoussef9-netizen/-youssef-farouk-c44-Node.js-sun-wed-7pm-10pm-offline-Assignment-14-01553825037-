import { NextFunction } from "express";
import { verifyToken } from "../utils/Token";
import { UserRebository } from "../model/user/user.Rebository";
import { NotFoundException } from "../utils";
import { Request, Response } from "express";

export const isAuthenticatedgraohql= async(context:any)=>{
        const token= context.token as string; 
        const payload=verifyToken(token);
        const userRebository  =new UserRebository();
        const user=await userRebository.exist({_id:payload._id})
        if(!user){
            throw new NotFoundException("User not found");
        }
        //inject user to context
        context.user=user;
      
      
        }