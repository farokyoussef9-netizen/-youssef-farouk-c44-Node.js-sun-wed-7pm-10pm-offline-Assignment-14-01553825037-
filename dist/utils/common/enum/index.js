"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REACTION = exports.USER_AGENT = exports.GENDER = exports.SYS_ROLE = void 0;
var SYS_ROLE;
(function (SYS_ROLE) {
    SYS_ROLE["user"] = "user";
    SYS_ROLE["Admin"] = "Admin";
    SYS_ROLE["superadmin"] = "superadmin";
})(SYS_ROLE || (exports.SYS_ROLE = SYS_ROLE = {}));
var GENDER;
(function (GENDER) {
    GENDER["male"] = "male";
    GENDER["female"] = "female";
})(GENDER || (exports.GENDER = GENDER = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT["local"] = "local";
    USER_AGENT["google"] = "google";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var REACTION;
(function (REACTION) {
    REACTION[REACTION["like"] = 0] = "like";
    REACTION[REACTION["care"] = 1] = "care";
    REACTION[REACTION["sad"] = 2] = "sad";
    REACTION[REACTION["angry"] = 3] = "angry";
    REACTION[REACTION["love"] = 4] = "love";
})(REACTION || (exports.REACTION = REACTION = {}));
