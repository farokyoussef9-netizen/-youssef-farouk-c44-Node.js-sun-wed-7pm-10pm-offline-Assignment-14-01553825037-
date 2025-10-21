"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isvalid = void 0;
const ERROR_1 = require("../utils/ERROR");
const isvalid = (schema) => {
    return (req, res, next) => {
        const data = {
            ...req.body,
            ...req.query,
            ...req.params
        };
        const validateData = schema.safeParse(data);
        if (!validateData.success) {
            let errmessages = validateData.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            }));
            throw new ERROR_1.BadRequestException("validation error", errmessages);
        }
        next();
    };
};
exports.isvalid = isvalid;
