"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entity");
class postFactory {
    createPost(postDto, user) {
        const newpost = new entity_1.post();
        newpost.userid = user._id;
        newpost.content = postDto.content;
        newpost.reactions = [];
        newpost.attachments = [];
        return newpost;
    }
    updatePost(post1, user) {
        const newpost = new entity_1.post();
        newpost.userid = user._id;
        newpost.content = post1.content;
        newpost.reactions = post1.reactions;
        newpost.attachments = post1.attachments;
        return newpost;
    }
}
exports.default = postFactory;
