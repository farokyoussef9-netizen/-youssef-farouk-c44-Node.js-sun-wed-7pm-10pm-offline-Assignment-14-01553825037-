"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_serviec_1 = __importDefault(require("./comment.serviec"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("{/:id}", (0, auth_middleware_1.isAuthenticated)(), comment_serviec_1.default.createcomment); //>> optional in version 5 //2 end point ختيجي عليها 
router.get("/:id", (0, auth_middleware_1.isAuthenticated)(), comment_serviec_1.default.getcomment);
router.delete("/:id", (0, auth_middleware_1.isAuthenticated)(), comment_serviec_1.default.hard_deletecomment);
router.patch("/:id", (0, auth_middleware_1.isAuthenticated)(), comment_serviec_1.default.addreaction);
router.delete("/:id", (0, auth_middleware_1.isAuthenticated)(), comment_serviec_1.default.soft_deletecomment);
exports.default = router;
