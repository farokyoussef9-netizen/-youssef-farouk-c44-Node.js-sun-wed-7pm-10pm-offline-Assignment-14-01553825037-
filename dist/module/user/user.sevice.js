"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_Rebository_1 = require("../../model/user/user.Rebository");
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
class UserService {
    userRebository = new user_Rebository_1.UserRebository();
    constructor() {
    }
    getprofile = (req, res, next) => {
        const user = this.userRebository.getone({ _id: req.params.id }, {}, { populate: "friends", select: "fullname firstname lastname " });
        return res.status(200).json({ message: "user profile", success: true, data: { user: req.user } });
    };
    sendrequest = async (req, res, next) => {
        const { friendID } = req.params;
        //cheak if userexist
        const userexist = await this.userRebository.exist({ _id: friendID });
        if (!userexist) {
            throw new utils_1.NotFoundException("user not found");
        }
        //cheak id already friends
        const user = req.user;
        const isfriend = user.friends?.map(id => id.toString()).includes(friendID);
        if (isfriend) {
            throw new utils_2.BadRequestException("user already friends");
        }
        //cheak have requests
        const isrequest = user.requests?.map(id => id.toString()).includes(friendID); //ودي بحول كل الي جوا الاراي من objectid to string map(id => id.toString()
        if (isrequest) {
            throw new utils_2.BadRequestException("user already friends");
        }
        await this.userRebository.update({ _id: friendID }, { $addToSet: { requests: user._id } }); //بخليها بدل الاراي تبقي set
        //await User.updateOne({_id:friendID},{$addToSet:{requests:user._id}})//بخليها بدل الاراي تبقي set
        //send request
        return res.status(200).json({ message: "request sent", success: true });
    };
    acceptrequest = async (req, res, next) => {
        const { friendID } = req.params;
        const user = req.user;
        const promise = Promise.all([
            this.userRebository.update({ _id: user._id }, { $addToSet: { friends: friendID }, $pull: { requests: friendID } }),
            this.userRebository.update({ _id: friendID }, { $addToSet: { friends: user._id } })
        ]);
        await promise;
        return res.status(200).json({ message: "request accepted", success: true });
    };
    deleterequset = async (req, res, next) => {
        const { friendID } = req.params;
        const user = req.user;
        const userexist = await this.userRebository.exist({ _id: friendID });
        if (!userexist) {
            throw new utils_1.NotFoundException("user not found");
        }
        const isrequest = userexist.requests?.map(id => id.toString()).includes(friendID);
        if (isrequest) {
            throw new utils_2.BadRequestException("user not have request");
        }
        await this.userRebository.update({ _id: user._id }, { $pull: { requests: friendID } });
        await this.userRebository.update({ _id: friendID }, { $pull: { requests: user._id } });
        return res.status(200).json({ message: "request deleted", success: true });
    };
    unfriend = async (req, res, next) => {
        const { friendID } = req.params;
        const user = req.user;
        const userexist = await this.userRebository.exist({ _id: friendID });
        if (!userexist) {
            throw new utils_1.NotFoundException("user not found");
        }
        const isfriend = user.friends?.map(id => id.toString()).includes(friendID);
        if (!isfriend) {
            throw new utils_2.BadRequestException("user not have friend");
        }
        await this.userRebository.update({ _id: user._id }, { $pull: { friends: friendID } });
        await this.userRebository.update({ _id: friendID }, { $pull: { friends: user._id } });
        return res.status(200).json({ message: "friend deleted", success: true });
    };
}
exports.default = new UserService();
