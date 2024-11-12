"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowSchemas = void 0;
const zod_1 = require("zod");
const createSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookId: zod_1.z.string(),
        memberId: zod_1.z.string(),
        dueDate: zod_1.z.string().optional(),
    }),
});
const updateSchema = zod_1.z.object({
    body: zod_1.z.object({
        borrowId: zod_1.z.string(),
    }),
});
exports.BorrowSchemas = {
    createSchema,
    updateSchema,
};
