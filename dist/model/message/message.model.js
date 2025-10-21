"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const message_schema_1 = require("./message.schema");
const mongoose_1 = require("mongoose");
exports.Message = (0, mongoose_1.model)("Message", message_schema_1.messageSchema);
