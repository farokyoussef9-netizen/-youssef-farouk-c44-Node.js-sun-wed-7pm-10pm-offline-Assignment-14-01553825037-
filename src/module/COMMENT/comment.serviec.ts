import { Request, Response } from "express";
import { CommentRepository } from "../../model";
import  {PostRebository } from "../../model";
import { IUser, IComment, NotFoundException, IPost,UnauthorizedException } from "../../utils";
import { CreateCommentDto } from "./comment.dto"
import { CommentFactory } from "./factory";
import { addreactionprovider } from "../../utils/common/providers";
class CommentService{
    private readonly commentRepository=new CommentRepository();
    private readonly postRepository=new PostRebository();
    private readonly commentFactory=new CommentFactory();
    createcomment = async (req: Request, res: Response) => {
        const { postid, id } = req.params;
        const createcommentdto: CreateCommentDto = req.body;
        const postexist = await this.postRepository.exist({ _id: postid });
        if (!postexist) {
            throw new NotFoundException("post not found");
        }
        let commentexist: any | IComment = undefined;
        if (id) {
            commentexist = await this.commentRepository.exist({ _id: id });
            if (!commentexist) {
                throw new NotFoundException("comment not found");
            }
        }
        //prepare data
        const comment = this.commentFactory.createComment(createcommentdto, req.user as IUser, postexist, commentexist); //entity
        const createdcomment = await this.commentRepository.create(comment);
        // createcomment.parentid=[];
        // createdcomment.markModified("parentid");>>بستخدمها لو عايز اعدل في field معين 
        // createdcomment.save()>>لو ماعملت markModified مش هيتعدل 
        return res.status(201).json({ message: "comment created successfully", success: true, data: { createdcomment } });
    };
    getcomment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const commentexist = await this.commentRepository.exist({ _id: id },{},{
            populate:[{path:"replies"}]
        })
        if (!commentexist) {
            throw new NotFoundException("comment not found")
        }

        return res.status(200).json({ message: "comment found", success: true, data: { commentexist } })
    }
   deletecomment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const commentexist = await this.commentRepository.exist({ _id: id },{},{populate:[{path:"postid",select:"userid"}]});
    if (!commentexist) {
        throw new NotFoundException("comment not found");
    }
    if(commentexist.userid.toString() != req.user?._id.toString()&&(commentexist.postid as unknown as IPost).userid.toString() != req.user?._id.toString()){
        throw new UnauthorizedException("you are not authorized to delete this comment");
    }
    await this.commentRepository.delete({ _id: id });
    return res.status(200).json({ message: "comment deleted successfully", success: true });
   }
   addreaction = async (req: Request, res: Response) => {
    const {id} = req.params ;
    const { reaction } = req.body;
    const userid = req.user?._id as unknown as string;
    await addreactionprovider(this.commentRepository,id as string,reaction,userid,res)
    return res.sendStatus(204);
}
}
export default new CommentService();