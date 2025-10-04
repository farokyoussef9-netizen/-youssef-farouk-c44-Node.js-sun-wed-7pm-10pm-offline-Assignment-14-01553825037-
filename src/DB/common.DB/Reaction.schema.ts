import {REACTION} from "../../utils/common/enum"
import {Schema} from "mongoose"
export const ReactionSchema=new Schema({
    reaction:{type:Number,enum:REACTION,default:REACTION.like},
    userid:{type:Schema.Types.ObjectId,ref:"User"},
},{timestamps:true})