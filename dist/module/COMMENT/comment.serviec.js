"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const model_2 = require("../../model");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
const providers_1 = require("../../utils/common/providers");
class CommentService {
    commentRepository = new model_1.CommentRepository();
    postRepository = new model_2.PostRebository();
    commentFactory = new factory_1.CommentFactory();
    createcomment = async (req, res) => {
        const { postid, id } = req.params;
        const createcommentdto = req.body;
        const postexist = await this.postRepository.exist({ _id: postid });
        if (postexist?.isDeleted == false) {
            throw new utils_1.NotFoundException("post not found");
        }
        if (!postexist) {
            throw new utils_1.NotFoundException("post not found");
        }
        let commentexist = undefined;
        if (id) {
            commentexist = await this.commentRepository.exist({ _id: id });
            if (!commentexist) {
                throw new utils_1.NotFoundException("comment not found");
            }
        }
        //prepare data
        const comment = this.commentFactory.createComment(createcommentdto, req.user, postexist, commentexist); //entity
        const createdcomment = await this.commentRepository.create(comment);
        // createcomment.parentid=[];
        // createdcomment.markModified("parentid");>>بستخدمها لو عايز اعدل في field معين 
        // createdcomment.save()>>لو ماعملت markModified مش هيتعدل 
        return res.status(201).json({ message: "comment created successfully", success: true, data: { createdcomment } });
    };
    getcomment = async (req, res) => {
        const { id } = req.params;
        const commentexist = await this.commentRepository.exist({ _id: id }, {}, {
            populate: [{ path: "replies" }]
        });
        if (commentexist?.isDeleted == false) {
            throw new utils_1.NotFoundException("comment not found");
        }
        if (!commentexist) {
            throw new utils_1.NotFoundException("comment not found");
        }
        return res.status(200).json({ message: "comment found", success: true, data: { commentexist } });
    };
    hard_deletecomment = async (req, res) => {
        const { id } = req.params;
        const commentexist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "postid", select: "userid" }] });
        if (!commentexist) {
            throw new utils_1.NotFoundException("comment not found");
        }
        if (commentexist.userid.toString() != req.user?._id.toString() && commentexist.postid.userid.toString() != req.user?._id.toString()) {
            throw new utils_1.UnauthorizedException("you are not authorized to delete this comment");
        }
        await this.commentRepository.delete({ _id: id });
        return res.status(200).json({ message: "comment deleted successfully", success: true });
    };
    addreaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userid = req.user?._id;
        const commentexist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "postid", select: "userid" }] });
        if (commentexist?.isDeleted == false) {
            throw new utils_1.NotFoundException("comment not found");
        }
        await (0, providers_1.addreactionprovider)(this.commentRepository, id, reaction, userid, res);
        return res.sendStatus(204);
    };
    soft_deletecomment = async (req, res) => {
        const { id } = req.params;
        const commentexist = await this.commentRepository.exist({ _id: id }, {}, { populate: [{ path: "postid", select: "userid" }] });
        if (!commentexist) {
            throw new utils_1.NotFoundException("comment not found");
        }
        if (commentexist.userid.toString() != req.user?._id.toString() && commentexist.postid.userid.toString() != req.user?._id.toString()) {
            throw new utils_1.UnauthorizedException("you are not authorized to delete this comment");
        }
        commentexist.isDeleted = true;
        commentexist.deletedAT = new Date();
        await this.commentRepository.update({ _id: id }, { isDeleted: true, deletedAT: new Date() });
        return res.status(200).json({ message: "comment deleted successfully", success: true });
    };
    update_comment = async (req, res) => {
        const { id } = req.params;
        const newcontent = req.body;
        const commentexist = await this.commentRepository.exist({ _id: id });
        if (commentexist?.isDeleted == false) {
            throw new utils_1.NotFoundException("comment not found");
        }
        if (!commentexist) {
            throw new utils_1.NotFoundException("comment not found");
        }
        if (commentexist.userid.toString() != req.user?._id.toString() && commentexist.postid.userid.toString() != req.user?._id.toString()) {
            throw new utils_1.UnauthorizedException("you are not authorized to delete this comment");
        }
        commentexist.content = newcontent;
        const comment = this.commentFactory.updateComment(commentexist);
        await this.commentRepository.update({ _id: id }, comment);
        return res.status(200).json({ message: "comment updated successfully", success: true });
    };
}
exports.default = new CommentService();
