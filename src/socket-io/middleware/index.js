"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const Token_1 = require("../../src/utils/Token");
const model_1 = require("../../src/model");
const authMiddleware = async (socket, next) => {
    const { authrization } = socket.handshake.auth;
    const payload = (0, Token_1.verifyToken)(authrization);
    const userRebository = new model_1.UserRebository();
    const user = await userRebository.getone({ _id: payload.id });
    socket.data.user = user;
    next();
};
exports.authMiddleware = authMiddleware;
