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
}
exports.default = postFactory;
