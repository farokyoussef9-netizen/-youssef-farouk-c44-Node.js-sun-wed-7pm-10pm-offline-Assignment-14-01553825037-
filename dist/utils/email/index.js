"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dev_config_1 = require("../../config/dev/dev.config");
const sendEmail = async (mailOptions) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: dev_config_1.devConfig.EMAIL_USER,
            pass: dev_config_1.devConfig.EMAIL_PASSWORD,
        },
    });
    ///عشان هو obj عدلت عليع وعملت فيه from
    mailOptions.from = `Social-App<${dev_config_1.devConfig.EMAIL_USER}>`;
    await transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
