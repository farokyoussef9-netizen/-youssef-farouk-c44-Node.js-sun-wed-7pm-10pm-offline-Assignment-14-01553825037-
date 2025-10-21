"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema_send_request = void 0;
const zod_1 = require("zod");
exports.schema_send_request = zod_1.z.object({
    friendID: zod_1.z.string(), // ده مطلوب تلقائيًا
});
