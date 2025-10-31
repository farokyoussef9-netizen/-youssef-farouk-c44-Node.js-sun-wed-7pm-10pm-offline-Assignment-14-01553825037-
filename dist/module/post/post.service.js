"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const Post_Rebository_1 = require("../../model/Post/Post.Rebository");
const utils_1 = require("../../utils");
const factory_1 = __importDefault(require("./factory"));
const providers_1 = require("../../utils/common/providers");
const user_Rebository_1 = require("../../model/user/user.Rebository");
const email_1 = require("../../utils/email");
class PostService {
    postFactory = new factory_1.default();
    postRebository = new Post_Rebository_1.PostRebository();
    userRebository = new user_Rebository_1.UserRebository();
    constructor() {
    }
    createPost = async (req, res) => {
        const postDto = req.body;
        const allmentions = [];
        if (postDto.mentions?.length) {
            for (const userid of postDto.mentions) {
                const userexist = await this.userRebository.exist({ _id: userid });
                if (!userexist) {
                    throw new utils_1.NotFoundException("user not found");
                }
                allmentions.push(userid);
                //send email
                const mailOptions = {
                    to: userexist.email,
                    subject: "New Mention",
                    text: "You have been mentioned in a post"
                };
                await (0, email_1.sendEmail)(mailOptions);
            }
        }
        //factory(prepare data)
        const post = this.postFactory.createPost(postDto, req.user);
        //rebository(save into DB)
        const postCreated = await this.postRebository.create(post);
        return res.status(201).json({ message: "post created successfully", success: true, data: { postCreated } });
    };
    addreaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userid = req.user?._id;
        const postexist = await this.postRebository.exist({ _id: id });
        if (postexist?.isDeleted == false) {
            throw new utils_1.NotFoundException("post not found");
        }
        await (0, providers_1.addreactionprovider)(this.postRebository, id, reaction, userid, res);
        return res.sendStatus(204);
    };
    get_post = async (req, res) => {
        const { id } = req.params;
        const postexist = await this.postRebository.getone({ _id: id }, {}, { populate: [{ path: "userid", select: "fullname firstname lastname" },
                { path: "reactions.userid", select: "fullname firstname lastname" },
                { path: "comments", match: { parentid: null } }] }); //اظهر first layer comments
        if (!postexist) {
            throw new utils_1.NotFoundException("post not found");
        }
        return res.status(200).json({ message: "post found", success: true, data: { postexist } });
    };
    hard_delete_post = async (req, res) => {
        const { id } = req.params;
        const postexist = await this.postRebository.exist({ _id: id });
        if (!postexist) {
            throw new utils_1.NotFoundException("post not found");
        }
        if (postexist.userid.toString() != req.user?._id.toString()) {
            throw new utils_1.UnauthorizedException("you are not authorized to delete this post");
        }
        await this.postRebository.delete({ _id: id });
        return res.status(200).json({ message: "post deleted successfully", success: true });
    };
    soft_delete_post = async (req, res) => {
        const { id } = req.params;
        const postexist = await this.postRebository.exist({ _id: id });
        if (!postexist) {
            throw new utils_1.NotFoundException("post not found");
        }
        if (postexist.userid.toString() != id) {
            throw new utils_1.UnauthorizedException("you are not authorized to delete this post");
        }
        postexist.isDeleted = true;
        postexist.deletedAT = new Date();
        await this.postRebository.update({ _id: id }, { isDeleted: true, deletedAT: new Date() });
        return res.status(200).json({ message: "post deleted successfully", success: true });
    };
    update_post = async (req, res) => {
        const { id } = req.params;
        const newcontent = req.body;
        const postexist = await this.postRebository.exist({ _id: id });
        if (postexist?.isDeleted == false) {
            throw new utils_1.NotFoundException("post not found");
        }
        if (!postexist) {
            throw new utils_1.NotFoundException("post not found");
        }
        if (postexist.userid.toString() != id) {
            throw new utils_1.UnauthorizedException("you are not authorized to delete this post");
        }
        postexist.content = newcontent;
        const post = this.postFactory.updatePost(postexist, req.user);
        await this.postRebository.update({ _id: id }, post);
        return res.status(200).json({ message: "post updated successfully", success: true });
    };
}
exports.PostService = PostService;
exports.default = new PostService();
/**
 * null >>قيمه عند mongoose
 * undefined >> هتشيل ال field خالص
 */ 
