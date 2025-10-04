import { Schema} from "mongoose";
import { IComment } from "../../utils";
import { AttachmentsSchema } from "../../DB/common.DB"
 export const commentSchema=new Schema<IComment>({
    userid:{type:Schema.Types.ObjectId,ref:"User",required:true},
    postid:{type:Schema.Types.ObjectId,ref:"Post",required:true},
    parentid:{type:Schema.Types.ObjectId,ref:"Comment"},
    attachments:{type:[AttachmentsSchema]},
    content:{type:String,required:true}
},{timestamps:true, toJSON:{virtuals:true},toObject:{virtuals:true}})
commentSchema.virtual("replies",{
    ref:"Comment",
    localField:"_id",
    foreignField:"parentid"
})
commentSchema.pre("deleteOne", async function (next) {
    const filter = (typeof this.getFilter === "function") ? this.getFilter() : {};
    
    const replies = await this.model.find({ parentid: filter._id });
  
    for (const reply of replies) {
      // Recursive delete: الأول احذف الـ replies بتاعة reply
      await this.model.deleteOne({ _id: reply._id });
    }
  
    next();
  });
  