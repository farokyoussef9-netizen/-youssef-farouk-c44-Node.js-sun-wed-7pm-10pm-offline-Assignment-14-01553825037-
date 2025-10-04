"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_vaidation_1 = require("./auth.vaidation");
const middleware_1 = require("../../middleware");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", (0, middleware_1.isvalid)(auth_vaidation_1.registerSchema), auth_service_1.default.register);
router.post("/verify", (0, auth_middleware_1.isAuthenticated)(), auth_service_1.default.verifyAccount);
router.post("/login", auth_service_1.default.Login);
exports.default = router;
