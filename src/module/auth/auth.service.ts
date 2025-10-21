import type { NextFunction, Request, Response } from "express";
import { RegisterDto, VerifyAccountDto,LoginDto,UpdatePasswordDto, UpdateEmailDto,UpdatebasicDto } from "./auth.dto";
import { ConflictException, NotFoundException ,BadRequestException,forbeddibnException, comparepassword, generateOTP, generateExpiryDate, generatehashPassword} from "../../utils";
import { UserRebository } from "../../model/user/user.Rebository";
import { AUTHFactory } from "./Factory";
import {generateToken} from "../../utils/Token"
import { registerSchema } from "./auth.vaidation";
import authProvider from "./provider/auth.provider";
import { compare } from "bcryptjs";
import { isvalid } from "../../middleware";
import { sendEmail } from "../../utils/email";
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
    const otp=generateOTP();
    const otpExpiry=generateExpiryDate(60*60*1000);
    if(user.email){
        await sendEmail({
        to:user.email,
        subject:"Verify your account",
        text:`Please verify your account by clicking on the link ${otp}`,
    })
    }
    user.Otp=otp;
    user.OtpExpiry=otpExpiry;
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
if(userexist.isVerified==false){
    throw new forbeddibnException("Please verify your account")
}
if(!(await comparepassword(loginDto.password,userexist.password))){
    throw new forbeddibnException("Invalid password")
}
    //generateToken
    const acsesstoken=generateToken({payload:{_id:userexist._id,role:userexist.role},options:{expiresIn:"1d"}})
res.status(201).json({message:"Login successfully",success:true,data:{acsesstoken}})
}
updatePassword=async(req:Request,res:Response,next:NextFunction)=>{
    const updatePasswordDto: UpdatePasswordDto = req.body;
    const userexist= await this.userRebository.exist({email:updatePasswordDto.email})
    if(!userexist){
        throw new NotFoundException("Invalid email")
    }
    if(!(await comparepassword(updatePasswordDto.password,userexist.password))){
        throw new BadRequestException("Invalid password")
    }
    userexist.password=await generatehashPassword(updatePasswordDto.newPassword)
    await this.userRebository.update({email:updatePasswordDto.email},{password:userexist.password})
    console.log(updatePasswordDto.password, userexist.password);
console.log(updatePasswordDto.newPassword, userexist.password);

    res.status(201).json({message:"Password updated successfully",success:true})
}
updateemail=async(req:Request,res:Response,next:NextFunction)=>{
    const updateemailDto: UpdateEmailDto = req.body;
    const userexist= await this.userRebository.exist({email:updateemailDto.email})
    if(!userexist){
        throw new NotFoundException("Invalid email")
    }
    if(!(await comparepassword(updateemailDto.password,userexist.password))){
        throw new BadRequestException("Invalid password")
    }
    userexist.email=updateemailDto.newEmail
    await this.userRebository.update({email:updateemailDto.email},{email:userexist.email})
 

    res.status(201).json({message:"Email updated successfully",success:true})
}
updatebasic=async(req:Request,res:Response,next:NextFunction)=>{
    const updatebasicDto: UpdatebasicDto = req.body;
    const userexist= await this.userRebository.exist({email:updatebasicDto.email})
    if(!userexist){
        throw new NotFoundException("Invalid email")
    }
    if(!(await comparepassword(updatebasicDto.password,userexist.password))){
        throw new BadRequestException("Invalid password")
    }
    userexist.fullname=updatebasicDto.newfullname as string;
    userexist.phone=updatebasicDto.newphone as string;
    await this.userRebository.update({email:updatebasicDto.email},{fullname:userexist.fullname,phone:userexist.phone})
 

    res.status(201).json({message:"Email updated successfully",success:true})
}
}
export default new AuthService();