"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const utils_1 = require("../../utils");
exports.registerSchema = zod_1.default.object({
    fullname: zod_1.default.string().min(2).max(20),
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6).max(20),
    gender: zod_1.default.enum(utils_1.GENDER),
    phone: zod_1.default.string().min(11).max(11),
});
