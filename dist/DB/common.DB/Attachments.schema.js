"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AttachmentsSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    type: { type: String, required: true }
});
