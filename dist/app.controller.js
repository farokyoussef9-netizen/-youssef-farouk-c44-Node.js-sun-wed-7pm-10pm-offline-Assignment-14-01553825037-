"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const module_1 = require("./module");
const DB_1 = require("./DB");
const cors_1 = __importDefault(require("cors"));
function bootstrap(app, express) {
    app.use(express.json());
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use("/auth", module_1.authRouter);
    app.use("/user", module_1.userRouter);
    app.use("/post", module_1.postRouter);
    app.use("/comment", module_1.commentRouter);
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "invalid router", success: false });
    });
    (0, DB_1.connectDB)();
    app.use((error, req, res, next) => {
        return res.status(error.statusCode || 500).json({ message: error.message, success: false, errorDetails: error.errorDetails });
    });
}
