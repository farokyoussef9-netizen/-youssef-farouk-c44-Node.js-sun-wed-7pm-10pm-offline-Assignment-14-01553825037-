import { PostDto } from "../post.Dto";
import { post } from "../entity";
import { IUser } from "../../../utils";

class postFactory{
    createPost(postDto:PostDto,user:IUser){
        const newpost=new post();
        newpost.userid=user._id;
        newpost.content=postDto.content;
        newpost.reactions=[];
        newpost.attachments=[];

        return newpost;
    }
}
export default postFactory
