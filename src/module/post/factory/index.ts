import { PostDto } from "../post.Dto";
import { post } from "../entity";
import { IPost, IAttachment, IUser } from "../../../utils";

class postFactory{
    createPost(postDto:PostDto,user:IUser){
        const newpost=new post();
        newpost.userid=user._id;
        newpost.content=postDto.content;
        newpost.reactions=[];
        newpost.attachments=[];

        return newpost;
    }
    updatePost(post1:IPost,user:IUser){
        const newpost=new post();
    newpost.userid=user._id;
        newpost.content=post1.content;
        newpost.reactions=post1.reactions;
        newpost.attachments=post1.attachments as IAttachment[];

       
        return newpost;
    }
}
export default postFactory
