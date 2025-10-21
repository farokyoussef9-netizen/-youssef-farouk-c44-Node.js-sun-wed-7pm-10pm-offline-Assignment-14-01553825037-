import { Schema } from "mongoose";
export const messageSchema=new Schema({
    sender:{type:Schema.Types.ObjectId,ref:"User",required:true},
    message:{type:String,required:true},
    
},{timestamps:true})