"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const post_schema_1 = require("./post.schema");
const mongoose_1 = require("mongoose");
exports.Post = (0, mongoose_1.model)("Post", post_schema_1.postSchema);
exports.default = exports.Post;
