"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionSchema = void 0;
const enum_1 = require("../../utils/common/enum");
const mongoose_1 = require("mongoose");
exports.ReactionSchema = new mongoose_1.Schema({
    reaction: { type: Number, enum: enum_1.REACTION, default: enum_1.REACTION.like },
    userid: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
