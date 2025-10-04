
import { JwtPayload } from "jsonwebtoken";
import {SYS_ROLE,GENDER,USER_AGENT, REACTION} from "../enum";
import { Request } from "express";
import { ObjectId } from "mongoose";
export interface IAttachment{
    url:string;
    type:string;
}
export interface IUser{
    fullname?:string;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    creaditionalupdateat:Date;
    phone?:string;
role:SYS_ROLE;
gender:GENDER;
userAgent: USER_AGENT;
Otp?:string;
OtpExpiry?:Date;
isVerified?:boolean;
}
export interface IUser{
    _id:ObjectId;
}
export interface IReaction{
    reaction:REACTION,
    userid:ObjectId
}
export interface IPost{
    _id:ObjectId;
    userid:ObjectId;
    content:string;
   reactions:IReaction[];
   attachments?:IAttachment[];
    
}
export interface IComment{
    _id:ObjectId;
  userid:ObjectId;
  postid:ObjectId;
  reactions:IReaction[];
  parentid?:ObjectId|null;
  attachments?:IAttachment[];
  content:string;
}

declare module "jsonwebtoken"{
    interface JwtPayload{
        _id:string;
        role:SYS_ROLE;
    }
}
declare module "express"{
    interface Request{
        user?:IUser;
    }
}