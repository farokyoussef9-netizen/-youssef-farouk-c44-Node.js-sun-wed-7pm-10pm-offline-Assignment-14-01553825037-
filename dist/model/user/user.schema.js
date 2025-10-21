"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userschema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../utils/common/enum");
const email_1 = require("../../utils/email");
exports.userschema = new mongoose_1.Schema({
    // fullname:{type:String,},Vitual field
    firstname: { type: String, minLength: 2, maxLength: 20, required: true, trim: true },
    lastname: { type: String, minLength: 2, maxLength: 20, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: function () {
            if (this.userAgent == enum_1.USER_AGENT.local) {
                return true;
            }
            return false;
        } },
    creaditionalupdateat: { type: Date },
    phone: { type: String },
    role: { type: String, enum: enum_1.SYS_ROLE, default: enum_1.SYS_ROLE.user },
    gender: { type: String, enum: enum_1.GENDER, default: enum_1.GENDER.male },
    userAgent: { type: String, enum: enum_1.USER_AGENT, default: enum_1.USER_AGENT.local },
    Otp: { type: String },
    OtpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    requests: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userschema.virtual("fullname").get(function () {
    return this.firstname + " " + this.lastname;
}).set(function (val) {
    this.firstname = val.split(" ")[0];
    this.lastname = val.split(" ")[1];
});
//middleware mongoose  (hooks)>>pre,after
exports.userschema.pre("save", async function (next) {
    if (this.userAgent != enum_1.USER_AGENT.google && this.isNew == true) {
        await (0, email_1.sendEmail)({ to: this.email, subject: "confirm account", html: `<h1> your otb is ${this.Otp}</h1>` });
        // next(new Error("KEFE KDA"));>>to global error handler
        //dont need write next to this function return promise}
    }
});
