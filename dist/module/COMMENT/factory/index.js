"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactory = void 0;
const entity_1 = require("../entity");
class CommentFactory {
    createComment(createcommentDto, user, post, comment) {
        const newcomment = new entity_1.COMMENT();
        // const parentids=comment?.parentid;
        newcomment.userid = user._id;
        newcomment.postid = post._id || comment?.postid;
        newcomment.content = createcommentDto.content;
        newcomment.parentid = comment ? comment._id : null;
        newcomment.attachments = [];
        newcomment.reactions = [];
        return newcomment;
    }
    updateComment(comment) {
        const newcomment = new entity_1.COMMENT();
        newcomment.userid = comment.userid;
        newcomment.postid = comment.postid;
        newcomment.content = comment.content;
        newcomment.parentid = comment.parentid;
        newcomment.attachments = comment.attachments;
        newcomment.reactions = comment.reactions;
        return newcomment;
    }
}
exports.CommentFactory = CommentFactory;
