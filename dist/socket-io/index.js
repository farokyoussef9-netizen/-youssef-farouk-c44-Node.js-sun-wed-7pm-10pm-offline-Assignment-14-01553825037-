"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initsocket = void 0;
const socket_io_1 = require("socket.io");
const middleware_1 = require("./middleware");
const message_rebository_1 = require("../model/message/message.rebository");
const chat_rebository_1 = require("../model/chat/chat.rebository");
const userconnections = new Map();
const initsocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
    io.use(middleware_1.authMiddleware);
    io.on("connection", async (socket) => {
        userconnections.set(socket.data.user.id, socket.id);
        socket.on("sendMessage", async (data) => {
            const destsocket = userconnections.get(data.destid); //.عشان ارجع اا socketid بتاعه
            socket.emit("successMessage", data);
            io.to(destsocket).emit("receiveMessage", data);
            //save in db
            //create message
            const messageRepository = new message_rebository_1.MessageRepository();
            const createdmessage = await messageRepository.create({
                sender: socket.data.user.id,
                message: data.message,
            });
            const chatRepository = new chat_rebository_1.ChatRepository();
            const chat = await chatRepository.getone({ users: { $all: [socket.data.user.id, data.destid] } });
            //if chat not exist create it
            if (!chat) {
                chatRepository.create({ users: [socket.data.user.id, data.destid], messages: [createdmessage._id] });
            }
            //else update it
            else {
                chatRepository.update({ users: { $all: [socket.data.user.id, data.destid] } }, { messages: { $push: createdmessage._id } });
            }
        });
    });
};
exports.initsocket = initsocket;
