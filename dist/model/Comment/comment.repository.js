"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const AbstractRepository_1 = __importDefault(require("../../DB/AbstractRepository"));
const comment_model_1 = require("./comment.model");
class CommentRepository extends AbstractRepository_1.default {
    constructor() {
        super(comment_model_1.Comment);
    }
}
exports.CommentRepository = CommentRepository;
