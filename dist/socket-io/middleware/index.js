"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const Token_1 = require("../../utils/Token");
const model_1 = require("../../model");
const utils_1 = require("../../utils");
const authMiddleware = async (socket, next) => {
    try {
        const { authrization } = socket.handshake.auth;
        const payload = (0, Token_1.verifyToken)(authrization);
        const userRebository = new model_1.UserRebository();
        const user = await userRebository.getone({ _id: payload.id });
        if (!user) {
            throw new utils_1.NotFoundException("user not found");
        }
        socket.data.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
