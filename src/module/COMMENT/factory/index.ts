import { CreateCommentDto } from "../comment.dto";
import { COMMENT } from "../entity";
import { IUser } from "../../../utils";
import { IComment } from "../../../utils/common/iterfaces";
import { IPost } from "../../../utils/common/iterfaces";
import { ObjectId } from "mongoose";

export class CommentFactory{
    createComment(createcommentDto:CreateCommentDto,user:IUser,post:IPost,comment?:IComment){
        const newcomment=new COMMENT();
        // const parentids=comment?.parentid;
        newcomment.userid=user._id;
        newcomment.postid=post._id||comment?.postid;
        newcomment.content=createcommentDto.content;
        newcomment.parentid= comment ?  comment._id : null;
newcomment.attachments=[];
        newcomment.reactions=[];
        return newcomment;
    }
}
    