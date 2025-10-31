"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isvalid = void 0;
const utils_1 = require("../utils");
const isvalid = (schema, args) => {
    const data = {
        args
    };
    const validateData = schema.safeParse(data);
    if (!validateData.success) {
        let errmessages = validateData.error.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message,
        }));
        throw new utils_1.BadRequestException("validation error", errmessages);
    }
};
exports.isvalid = isvalid;
