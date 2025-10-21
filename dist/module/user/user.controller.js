"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_sevice_1 = __importDefault(require("./user.sevice"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get("/profile", (0, auth_middleware_1.isAuthenticated)(), user_sevice_1.default.getprofile);
router.post("/sendrequest/:friendID", (0, auth_middleware_1.isAuthenticated)(), (0, validation_middleware_1.isvalid)(user_validation_1.schema_send_request), user_sevice_1.default.sendrequest);
router.put("/acceptrequest/:friendID", (0, auth_middleware_1.isAuthenticated)(), user_sevice_1.default.acceptrequest);
router.delete("/deleterequset/:friendID", (0, auth_middleware_1.isAuthenticated)(), user_sevice_1.default.deleterequset);
router.put("/unfriend/:friendID", (0, auth_middleware_1.isAuthenticated)(), user_sevice_1.default.unfriend);
exports.default = router;
