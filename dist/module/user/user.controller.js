"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_sevice_1 = __importDefault(require("./user.sevice"));
const router = (0, express_1.Router)();
router.get("./:id", user_sevice_1.default.getprofile);
exports.default = router;
