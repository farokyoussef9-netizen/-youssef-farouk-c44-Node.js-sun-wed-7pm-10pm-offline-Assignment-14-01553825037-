"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addreactionprovider = void 0;
const ERROR_1 = require("../../ERROR");
const enum_1 = require("../../common/enum");
const addreactionprovider = async (rebo, id, reaction, userid, res) => {
    const postexist = await rebo.exist({ _id: id });
    if (!postexist) {
        throw new ERROR_1.NotFoundException("post not found");
    }
    const userreactindex = postexist.reactions.findIndex((reaction) => (reaction.userid.toString() == userid?.toString()));
    console.log({ userreactindex });
    if (userreactindex == -1) {
        await rebo.update({ _id: id }, { $push: { reactions: { reaction: [null, "", undefined].includes(reaction) ? enum_1.REACTION.like : reaction, userid } } });
        return res.sendStatus(204);
    }
    else if ([null, "", undefined].includes(reaction)) {
        console.log("2");
        await rebo.update({ _id: id }, { $pull: { reactions: postexist.reactions[userreactindex] } });
    }
    else {
        console.log("1");
        await rebo.update({ _id: id, "reactions.userid": userid }, { "reactions.$.reaction": reaction });
        return res.sendStatus(204);
    }
};
exports.addreactionprovider = addreactionprovider;
