"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpiryDate = exports.generateOTP = void 0;
const generateOTP = () => {
    return Math.floor(10000 + Math.random() * 99999);
};
exports.generateOTP = generateOTP;
const generateExpiryDate = (time) => {
    return new Date(Date.now() + time);
};
exports.generateExpiryDate = generateExpiryDate;
