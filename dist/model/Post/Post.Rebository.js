"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRebository = void 0;
const AbstractRepository_1 = __importDefault(require("../../DB/AbstractRepository"));
const post_model_1 = require("./post.model");
class PostRebository extends AbstractRepository_1.default {
    constructor() {
        super(post_model_1.Post);
    }
}
exports.PostRebository = PostRebository;
