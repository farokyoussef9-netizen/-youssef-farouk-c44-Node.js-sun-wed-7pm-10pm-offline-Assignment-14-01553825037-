"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_service_1 = __importDefault(require("./post.service"));
const comment_controller_1 = __importDefault(require("../COMMENT/comment.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use("/:postid/comment", comment_controller_1.default);
router.post("/", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.createPost);
router.patch("/:id", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.addreaction);
router.get("/:id", post_service_1.default.get_post);
router.delete("/:id", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.delete_post);
exports.default = router;
