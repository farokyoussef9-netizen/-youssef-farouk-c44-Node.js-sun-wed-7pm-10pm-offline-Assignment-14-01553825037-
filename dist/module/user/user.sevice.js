"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_Rebository_1 = require("../../model/user/user.Rebository");
class UserService {
    userRebository = new user_Rebository_1.UserRebository();
    constructor() {
    }
    getprofile = (req, res, next) => {
        const user = this.userRebository.getone({ _id: req.params.id });
        return res.status(200).json({ message: "user profile", success: true, data: user });
    };
}
exports.default = new UserService();
