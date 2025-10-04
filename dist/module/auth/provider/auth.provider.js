"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_Rebository_1 = require("../../../model/user/user.Rebository");
const utils_1 = require("../../../utils");
const authProvider = {
    async cheachotb(verifyAccountDto) {
        const userRebository = new user_Rebository_1.UserRebository();
        const user = await userRebository.exist({ email: verifyAccountDto.email });
        if (!user) {
            throw new utils_1.NotFoundException("User not found");
        }
        if (user.Otp != verifyAccountDto.otp) {
            throw new utils_1.BadRequestException("Invalid OTP");
        }
        if (user.OtpExpiry < new Date()) {
            throw new utils_1.BadRequestException("OTP expired");
        }
    }
};
exports.default = authProvider;
