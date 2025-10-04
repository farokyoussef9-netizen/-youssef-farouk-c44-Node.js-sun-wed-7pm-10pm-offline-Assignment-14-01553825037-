import type { NextFunction, Request, Response } from "express";
import { RegisterDto, VerifyAccountDto,LoginDto } from "./auth.dto";
import { ConflictException, NotFoundException ,BadRequestException,forbeddibnException, comparepassword} from "../../utils";
import { UserRebository } from "../../model/user/user.Rebository";
import { AUTHFactory } from "./Factory";
import {generateToken} from "../../utils/Token"
import { registerSchema } from "./auth.vaidation";
import authProvider from "./provider/auth.provider";
import { compare } from "bcryptjs";
import { isvalid } from "../../middleware";
class AuthService{
    private userRebository=new UserRebository();
    private authFactory=new AUTHFactory();
    
    register=async(req:Request,res:Response,next:NextFunction)=>{
         // get data from req
    // registerDto is a object from type RegisterUserDTO >> so it is distract data from req.body
    const registerDto: RegisterDto = req.body;
 

   
    const userExist=await this.userRebository.exist({email:registerDto.email})
    if (userExist) {
      throw new ConflictException("User already exists"); // use conflictException class to throw error >> and send the message only
    }
    // prepare data >> create user document - hashing - encription - generate otb - translator
    const user = await this.authFactory.register(registerDto);
    // save into DB
    const userCreated = await this.userRebository.create(user); // send user to create method (after prepare data) not registerDto (from req.body)
    // send response
    return res.status(201).json({
      message: "user created successfuly",
      success: true,
      data: userCreated,
    });
  };

  verifyAccount=async(req:Request,res:Response,next:NextFunction)=>{
    const verifyAccountDto: VerifyAccountDto = req.body;
    await authProvider.cheachotb(verifyAccountDto);
   this.userRebository.update({email:verifyAccountDto.email},{isVerified:true,$unset:{otp:"",otpExpiry:""}});
    res.sendStatus(204)///No content//حتي لو بعت json

}
Login=async(req:Request,res:Response,next:NextFunction)=>{
    const loginDto: LoginDto = req.body;
const userexist= await this.userRebository.exist({email:loginDto.email})
if(!userexist){
    throw new forbeddibnException("Invalid email")
}
if(!(await comparepassword(loginDto.password,userexist.password))){
    throw new forbeddibnException("Invalid password")
}
    //generateToken
    const acsesstoken=generateToken({payload:{_id:userexist._id,role:userexist.role},options:{expiresIn:"1d"}})
res.status(201).json({message:"Login successfully",success:true,data:{acsesstoken}})
}
}
export default new AuthService();