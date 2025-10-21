"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const AbstractRepository_1 = __importDefault(require("../../DB/AbstractRepository"));
const message_model_1 = require("./message.model");
class MessageRepository extends AbstractRepository_1.default {
    constructor() {
        super(message_model_1.Message);
    }
}
exports.MessageRepository = MessageRepository;
