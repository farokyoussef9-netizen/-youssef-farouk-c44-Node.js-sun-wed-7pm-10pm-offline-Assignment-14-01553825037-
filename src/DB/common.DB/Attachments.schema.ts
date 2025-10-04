import { Schema } from "mongoose";

export const AttachmentsSchema=new Schema({
    url:{type:String,required:true},
    type:{type:String,required:true}
})