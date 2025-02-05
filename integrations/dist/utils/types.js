"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = void 0;
const zod_1 = require("zod");
exports.userDetails = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.number()
});
