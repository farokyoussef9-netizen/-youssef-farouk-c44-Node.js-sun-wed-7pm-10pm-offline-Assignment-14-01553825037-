
import type { NextFunction,Request,Response } from "express";
import { UserRebository } from "../../model/user/user.Rebository"
 class UserService{
    private readonly userRebository=new UserRebository();
    constructor(){
    }
    getprofile=(req:Request,res:Response,next:NextFunction)=>{
        const user=this.userRebository.getone({_id:req.params.id})
        return res.status(200).json({message:"user profile",success:true,data:user})
    }
}
export default new UserService();
