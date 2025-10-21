"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_rebository_1 = require("../../model/chat/chat.rebository");
const utils_1 = require("../../utils");
class ChatService {
    chatRepository = new chat_rebository_1.ChatRepository();
    constructor() {
    }
    getChat = async (req, res) => {
        const { userid } = req.params;
        const userlogin = req.user?._id;
        const chat = await this.chatRepository.getone({ users: { $all: [userlogin, userid] } }, {}, { populate: [{ path: "messages" }] });
        if (!chat) {
            throw new utils_1.NotFoundException("chat not found");
        }
        return res.status(200).json({
            success: true,
            message: "chat found",
            data: chat
        });
    };
}
exports.default = ChatService;
