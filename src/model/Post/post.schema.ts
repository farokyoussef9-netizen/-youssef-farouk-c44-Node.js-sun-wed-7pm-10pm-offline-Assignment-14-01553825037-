import {Schema} from "mongoose";
import { IPost } from "../../utils/common/iterfaces";
import {REACTION} from "../../utils/common/enum"
import { IAttachment } from "../../utils/common/iterfaces";
import {ReactionSchema} from "../../DB/common.DB"
import {AttachmentsSchema} from "../../DB/common.DB"
import {Comment} from "../Comment/comment.model"
import console from "console";
export const postSchema=new Schema<IPost>({
    userid:{type:Schema.Types.ObjectId,ref:"User",required:true},
    content:{type:String,required:true},
    reactions:{type:[ReactionSchema]},
   attachments:{type:[AttachmentsSchema]}//imbeded document//document in document
},{timestamps:true,toObject:{virtuals:true},toJSON:{virtuals:true}});
postSchema.virtual("comments",{
    localField:"_id",
    foreignField:"postid",
    ref:"Comment"
});

postSchema.pre("deleteOne",async function(next){
    const filter=typeof this.getFilter=="function"?this.getFilter():{};
  
   await Comment.deleteMany({postid:filter._id})
 
    next()
})