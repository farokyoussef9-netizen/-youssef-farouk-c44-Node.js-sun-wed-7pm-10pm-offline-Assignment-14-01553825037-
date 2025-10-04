import { NotFoundException } from "../../ERROR";
import { PostRebository } from "../../../model/Post/Post.Rebository";
import { CommentRepository } from "../../../model/Comment/comment.repository";
import { REACTION } from "../../common/enum";
import { Response } from "express";
export const addreactionprovider=async(rebo:PostRebository|CommentRepository
    ,id:string,
    reaction:string,
    userid:string,
    res:Response
)=>{
    const postexist = await rebo.exist({ _id: id });
        if (!postexist) {
            throw new NotFoundException("post not found")
        }
        const userreactindex = postexist.reactions.findIndex((reaction) => (reaction.userid.toString() == userid?.toString()));
        console.log({ userreactindex })
        if (userreactindex == -1) {
            await rebo.update({ _id: id }, { $push: { reactions: { reaction: [null, "", undefined].includes(reaction) ? REACTION.like : reaction, userid } } })
            return res.sendStatus(204);
        } else if ([null, "", undefined].includes(reaction)) {
            console.log("2")
            await rebo.update({ _id: id }, { $pull: { reactions: postexist.reactions[userreactindex] } })
        }
        else {
            console.log("1")
            await rebo.update({ _id: id, "reactions.userid": userid }, { "reactions.$.reaction": reaction })
            return res.sendStatus(204);
        }
    }