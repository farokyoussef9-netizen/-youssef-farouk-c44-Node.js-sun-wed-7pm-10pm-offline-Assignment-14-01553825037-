"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const message_schema_1 = require("./message.schema");
const mongoose_1 = require("mongoose");
exports.Chat = (0, mongoose_1.model)("Chat", message_schema_1.messageSchema);
