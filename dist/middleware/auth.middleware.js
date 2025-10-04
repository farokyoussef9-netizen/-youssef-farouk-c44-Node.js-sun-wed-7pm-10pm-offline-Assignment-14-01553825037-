"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const Token_1 = require("../utils/Token");
const user_Rebository_1 = require("../model/user/user.Rebository");
const utils_1 = require("../utils");
const isAuthenticated = () => {
    return async (req, res, next) => {
        const token = req.headers["authorization"];
        const payload = (0, Token_1.verifyToken)(token);
        const userRebository = new user_Rebository_1.UserRebository();
        const user = await userRebository.exist({ _id: payload._id });
        if (!user) {
            throw new utils_1.NotFoundException("User not found");
        }
        req.user = user;
        next();
    };
};
exports.isAuthenticated = isAuthenticated;
