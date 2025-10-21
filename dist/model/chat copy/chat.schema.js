"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const mongoose_1 = require("mongoose");
const message_schema_1 = require("../../DB/common.DB/message.schema");
exports.chatSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [message_schema_1.messageSchema]
});
