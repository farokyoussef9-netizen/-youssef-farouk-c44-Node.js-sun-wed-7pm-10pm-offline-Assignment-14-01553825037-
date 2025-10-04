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
        if (!(await (0, utils_1.comparepassword)(loginDto.password, userexist.password))) {
            throw new utils_1.forbeddibnException("Invalid password");
        }
        //generateToken
        const acsesstoken = (0, Token_1.generateToken)({ payload: { _id: userexist._id, role: userexist.role }, options: { expiresIn: "1d" } });
        res.status(201).json({ message: "Login successfully", success: true, data: { acsesstoken } });
    };
}
exports.default = new AuthService();
