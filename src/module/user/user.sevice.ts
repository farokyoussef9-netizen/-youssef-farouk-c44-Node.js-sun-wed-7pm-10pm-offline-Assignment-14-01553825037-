
import type { NextFunction,Request,Response } from "express";
import { UserRebository } from "../../model/user/user.Rebository"
import { IUser, NotFoundException } from "../../utils";
import { BadRequestException } from "../../utils";
import { User } from "../../model/user/user.model";
import { promise } from "zod";
 class UserService{
    private readonly userRebository=new UserRebository();
    constructor(){
    }
    getprofile=(req:Request,res:Response,next:NextFunction)=>{
        const user=this.userRebository.getone({_id:req.params.id},{},{populate:"friends",select:"fullname firstname lastname "})
        return res.status(200).json({message:"user profile",success:true,data:{user:req.user}})
    }
    sendrequest=async(req:Request,res:Response,next:NextFunction)=>{
        const {friendID}=req.params;
        //cheak if userexist
        const userexist= await this.userRebository.exist({_id:friendID})
        if(!userexist){
          throw new NotFoundException("user not found")
        }
        //cheak id already friends
        const user=req.user as IUser;
      const isfriend = user.friends?.map(id => id.toString()).includes(friendID as string);
      if(isfriend){
        throw new BadRequestException("user already friends")
      }
        //cheak have requests
        const isrequest = user.requests?.map(id => id.toString()).includes(friendID as string);//ودي بحول كل الي جوا الاراي من objectid to string map(id => id.toString()
        if(isrequest){
            throw new BadRequestException("user already friends")
        }
     await this.userRebository.update({_id:friendID},{$addToSet:{requests:user._id}})//بخليها بدل الاراي تبقي set
    //await User.updateOne({_id:friendID},{$addToSet:{requests:user._id}})//بخليها بدل الاراي تبقي set
        //send request
       
           return res.status(200).json({message:"request sent",success:true})
    }
    acceptrequest=async(req:Request,res:Response,next:NextFunction)=>{
        const {friendID}=req.params;
        const user=req.user as IUser;
       
        const promise= Promise.all([
             this.userRebository.update({_id:user._id},{$addToSet:{friends:friendID},$pull:{requests:friendID}}),
        this.userRebository.update({_id:friendID},{$addToSet:{friends:user._id}})
        ])
        await promise;
        
        
        return res.status(200).json({message:"request accepted",success:true})
    }
    deleterequset=async(req:Request,res:Response,next:NextFunction)=>{
const {friendID}=req.params;
const user=req.user as IUser;
const userexist= await this.userRebository.exist({_id:friendID});
if(!userexist){
    throw new NotFoundException("user not found")
}
const isrequest = userexist.requests?.map(id => id.toString()).includes(friendID as string);
if(isrequest){
    throw new BadRequestException("user not have request")
}
await this.userRebository.update({_id:user._id},{$pull:{requests:friendID}})
await this.userRebository.update({_id:friendID},{$pull:{requests:user._id}})
return res.status(200).json({message:"request deleted",success:true})
    }
    unfriend=async(req:Request,res:Response,next:NextFunction)=>{
        const {friendID}=req.params;
        const user=req.user as IUser;
     const userexist=   await this.userRebository.exist({_id:friendID});
        if(!userexist){
            throw new NotFoundException("user not found")
        }
        const isfriend = user.friends?.map(id => id.toString()).includes(friendID as string);
        if(!isfriend){
            throw new BadRequestException("user not have friend")
        }
        await this.userRebository.update({_id:user._id},{$pull:{friends:friendID}})
        await this.userRebository.update({_id:friendID},{$pull:{friends:user._id}})
        return res.status(200).json({message:"friend deleted",success:true})
    }
}
export default new UserService();
