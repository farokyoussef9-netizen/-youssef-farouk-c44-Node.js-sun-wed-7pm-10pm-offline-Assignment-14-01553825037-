"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRebository = void 0;
const user_model_1 = require("./user.model");
const AbstractRepository_1 = __importDefault(require("../../DB/AbstractRepository"));
class UserRebository extends AbstractRepository_1.default {
    constructor() {
        super(user_model_1.User);
    }
    GetAllUsers() {
        return this.model.find();
    }
}
exports.UserRebository = UserRebository;
