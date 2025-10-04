"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const common_DB_1 = require("../../DB/common.DB");
const common_DB_2 = require("../../DB/common.DB");
const comment_model_1 = require("../Comment/comment.model");
exports.postSchema = new mongoose_1.Schema({
    userid: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    reactions: { type: [common_DB_1.ReactionSchema] },
    attachments: { type: [common_DB_2.AttachmentsSchema] } //imbeded document//document in document
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postid",
    ref: "Comment"
});
exports.postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    await comment_model_1.Comment.deleteMany({ postid: filter._id });
    next();
});
