"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const common_DB_1 = require("../../DB/common.DB");
exports.commentSchema = new mongoose_1.Schema({
    userid: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    postid: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post", required: true },
    parentid: { type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" },
    attachments: { type: [common_DB_1.AttachmentsSchema] },
    content: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAT: { type: Date }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentid"
});
exports.commentSchema.pre("deleteOne", async function (next) {
    const filter = (typeof this.getFilter === "function") ? this.getFilter() : {};
    const replies = await this.model.find({ parentid: filter._id });
    for (const reply of replies) {
        // Recursive delete: الأول احذف الـ replies بتاعة reply
        await this.model.deleteOne({ _id: reply._id });
    }
    next();
});
