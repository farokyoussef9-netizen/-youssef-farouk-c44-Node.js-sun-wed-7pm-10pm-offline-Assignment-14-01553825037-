"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHFactory = void 0;
const entity_1 = require("../entity");
const enum_1 = require("../../../utils/common/enum");
const enum_2 = require("../../../utils/common/enum");
const OTP_1 = require("../../../utils/OTP");
const hash_1 = require("../../../utils/hash");
//prepare data
class AUTHFactory {
    async register(registerDto) {
        const user = new entity_1.User();
        user.fullname = registerDto.fullname;
        user.email = registerDto.email;
        user.password = await (0, hash_1.generatehashPassword)(registerDto.password);
        user.phone = registerDto.phone;
        user.gender = registerDto.gender;
        user.userAgent = enum_1.USER_AGENT.local;
        user.role = enum_2.SYS_ROLE.user;
        user.Otp = (0, OTP_1.generateOTP)();
        user.OtpExpiry = (0, OTP_1.generateExpiryDate)(5 * 60 * 60 * 1000);
        user.creaditionalupdateat = new Date();
        user.isVerified = false;
        return user;
    }
}
exports.AUTHFactory = AUTHFactory;
