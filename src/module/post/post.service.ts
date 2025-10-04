import { Request, Response } from "express";
import { PostRebository } from "../../model/Post/Post.Rebository";
import { NotFoundException,UnauthorizedException } from "../../utils";
import { IUser } from "../../utils/common/iterfaces";
import postFactory from "./factory";
import { PostDto } from "./post.Dto";
import { REACTION } from "../../utils"
import console from "console";
import { addreactionprovider } from "../../utils/common/providers";
export class PostService {
    private readonly postFactory = new postFactory();
    private readonly postRebository = new PostRebository();
    constructor() {

    }
    createPost = async (req: Request, res: Response) => {
        const postDto: PostDto = req.body;
        //factory(prepare data)
        const post = this.postFactory.createPost(postDto, req.user as IUser);
        //rebository(save into DB)
        const postCreated = await this.postRebository.create(post);
        return res.status(201).json({ message: "post created successfully", success: true, data: { postCreated } })
    }
    addreaction = async (req: Request, res: Response) => {
        const {id} = req.params ;
        const { reaction } = req.body;
        const userid = req.user?._id as unknown as string;
        await addreactionprovider(this.postRebository,id as string,reaction,userid,res)
        return res.sendStatus(204);
    }
    get_post = async (req: Request, res: Response) => {
        const { id } = req.params;
        const postexist = await this.postRebository.getone({ _id: id }, {},
             { populate: [{ path: "userid", select: "fullname firstname lastname" },
                 { path: "reactions.userid", select: "fullname firstname lastname" },
                 {path:"comments",match:{parentid:null}}] }) //اظهر first layer comments
        if (!postexist) {
            throw new NotFoundException("post not found")
        }

        return res.status(200).json({ message: "post found", success: true, data: { postexist } })
    }
    delete_post = async (req: Request, res: Response) => {
        const { id } = req.params;
        const postexist = await this.postRebository.exist({ _id: id });
        if (!postexist) {
            throw new NotFoundException("post not found");
        }
        if(postexist.userid.toString() != req.user?._id.toString()){
            throw new UnauthorizedException("you are not authorized to delete this post");
        }
        await this.postRebository.delete({ _id: id });
        return res.status(200).json({ message: "post deleted successfully", success: true });
    }
}
export default new PostService();

/**
 * null >>قيمه عند mongoose
 * undefined >> هتشيل ال field خالص
 */