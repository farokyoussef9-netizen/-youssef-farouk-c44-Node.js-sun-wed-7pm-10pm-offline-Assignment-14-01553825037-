"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const user_Rebository_1 = require("../../model/user/user.Rebository");
const Factory_1 = require("./Factory");
const Token_1 = require("../../utils/Token");
const auth_provider_1 = __importDefault(require("./provider/auth.provider"));
const email_1 = require("../../utils/email");
class AuthService {
    userRebository = new user_Rebository_1.UserRebository();
    authFactory = new Factory_1.AUTHFactory();
    register = async (req, res, next) => {
        // get data from req
        // registerDto is a object from type RegisterUserDTO >> so it is distract data from req.body
        const registerDto = req.body;
        const userExist = await this.userRebository.exist({ email: registerDto.email });
        if (userExist) {
            throw new utils_1.ConflictException("User already exists"); // use conflictException class to throw error >> and send the message only
        }
        // prepare data >> create user document - hashing - encription - generate otb - translator
        const user = await this.authFactory.register(registerDto);
        // save into DB
        const userCreated = await this.userRebository.create(user); // send user to create method (after prepare data) not registerDto (from req.body)
        // send response
        const otp = (0, utils_1.generateOTP)();
        const otpExpiry = (0, utils_1.generateExpiryDate)(60 * 60 * 1000);
        if (user.email) {
            await (0, email_1.sendEmail)({
                to: user.email,
                subject: "Verify your account",
                text: `Please verify your account by clicking on the link ${otp}`,
            });
        }
        user.Otp = otp;
        user.OtpExpiry = otpExpiry;
        return res.status(201).json({
            message: "user created successfuly",
            success: true,
            data: userCreated,
        });
    };
    verifyAccount = async (req, res, next) => {
        const verifyAccountDto = req.body;
        await auth_provider_1.default.cheachotb(verifyAccountDto);
        this.userRebository.update({ email: verifyAccountDto.email }, { isVerified: true, $unset: { otp: "", otpExpiry: "" } });
        res.sendStatus(204); ///No content//حتي لو بعت json
    };
    Login = async (req, res, next) => {
        const loginDto = req.body;
        const userexist = await this.userRebository.exist({ email: loginDto.email });
        if (!userexist) {
            throw new utils_1.forbeddibnException("Invalid email");
        }
        if (userexist.isVerified == false) {
            throw new utils_1.forbeddibnException("Please verify your account");
        }
        if (!(await (0, utils_1.comparepassword)(loginDto.password, userexist.password))) {
            throw new utils_1.forbeddibnException("Invalid password");
        }
        //generateToken
        const acsesstoken = (0, Token_1.generateToken)({ payload: { _id: userexist._id, role: userexist.role }, options: { expiresIn: "1d" } });
        res.status(201).json({ message: "Login successfully", success: true, data: { acsesstoken } });
    };
    updatePassword = async (req, res, next) => {
        const updatePasswordDto = req.body;
        const userexist = await this.userRebository.exist({ email: updatePasswordDto.email });
        if (!userexist) {
            throw new utils_1.NotFoundException("Invalid email");
        }
        if (!(await (0, utils_1.comparepassword)(updatePasswordDto.password, userexist.password))) {
            throw new utils_1.BadRequestException("Invalid password");
        }
        userexist.password = await (0, utils_1.generatehashPassword)(updatePasswordDto.newPassword);
        await this.userRebository.update({ email: updatePasswordDto.email }, { password: userexist.password });
        console.log(updatePasswordDto.password, userexist.password);
        console.log(updatePasswordDto.newPassword, userexist.password);
        res.status(201).json({ message: "Password updated successfully", success: true });
    };
    updateemail = async (req, res, next) => {
        const updateemailDto = req.body;
        const userexist = await this.userRebository.exist({ email: updateemailDto.email });
        if (!userexist) {
            throw new utils_1.NotFoundException("Invalid email");
        }
        if (!(await (0, utils_1.comparepassword)(updateemailDto.password, userexist.password))) {
            throw new utils_1.BadRequestException("Invalid password");
        }
        userexist.email = updateemailDto.newEmail;
        await this.userRebository.update({ email: updateemailDto.email }, { email: userexist.email });
        res.status(201).json({ message: "Email updated successfully", success: true });
    };
    updatebasic = async (req, res, next) => {
        const updatebasicDto = req.body;
        const userexist = await this.userRebository.exist({ email: updatebasicDto.email });
        if (!userexist) {
            throw new utils_1.NotFoundException("Invalid email");
        }
        if (!(await (0, utils_1.comparepassword)(updatebasicDto.password, userexist.password))) {
            throw new utils_1.BadRequestException("Invalid password");
        }
        userexist.fullname = updatebasicDto.newfullname;
        userexist.phone = updatebasicDto.newphone;
        await this.userRebository.update({ email: updatebasicDto.email }, { fullname: userexist.fullname, phone: userexist.phone });
        res.status(201).json({ message: "Email updated successfully", success: true });
    };
}
exports.default = new AuthService();
