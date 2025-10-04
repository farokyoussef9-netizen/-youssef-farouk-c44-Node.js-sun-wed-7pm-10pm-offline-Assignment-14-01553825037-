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
}
exports.CommentFactory = CommentFactory;
