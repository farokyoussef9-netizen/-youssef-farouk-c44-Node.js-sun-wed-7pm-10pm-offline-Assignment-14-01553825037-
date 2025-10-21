import { Schema } from "mongoose";  
import { messageSchema } from "../../DB/common.DB/message.schema";
export const chatSchema=new Schema({
    users:[{type:Schema.Types.ObjectId,ref:"User",required:true}],
    messages:[{type:Schema.Types.ObjectId,ref:"Message",required:true}]
})
