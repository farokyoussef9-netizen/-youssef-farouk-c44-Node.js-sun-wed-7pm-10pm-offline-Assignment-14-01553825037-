"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const AbstractRepository_1 = __importDefault(require("../../DB/AbstractRepository"));
const chat_model_1 = require("./chat.model");
class ChatRepository extends AbstractRepository_1.default {
    constructor() {
        super(chat_model_1.Chat);
    }
}
exports.ChatRepository = ChatRepository;
