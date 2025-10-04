"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparepassword = exports.generatehashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generatehashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 10);
};
exports.generatehashPassword = generatehashPassword;
const comparepassword = async (password, hashPassword) => {
    return await bcryptjs_1.default.compare(password, hashPassword);
};
exports.comparepassword = comparepassword;
