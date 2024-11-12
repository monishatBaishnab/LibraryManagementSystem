"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchemas = void 0;
const zod_1 = require("zod");
const creteSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: "Title is required." })
            .min(1, { message: "Title cannot be empty." }),
        genre: zod_1.z
            .string({ required_error: "Genre is required." })
            .min(1, { message: "Genre cannot be empty." }),
        publishedYear: zod_1.z
            .number({ required_error: "Published year is required." })
            .int({ message: "Published year must be an integer." })
            .min(1000, { message: "Published year must be at least 1000." }),
        totalCopies: zod_1.z
            .number({ required_error: "Total copies are required." })
            .int({ message: "Total copies must be an integer." })
            .positive({ message: "Total copies must be a positive number." }),
        availableCopies: zod_1.z
            .number({ required_error: "Available copies are required." })
            .int({ message: "Available copies must be an integer." })
            .min(0, { message: "Available copies cannot be negative." })
    }),
});
const updateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publishedYear: zod_1.z.number().optional(),
        totalCopies: zod_1.z.number().optional(),
        availableCopies: zod_1.z.number().optional(),
    }),
});
exports.BookSchemas = {
    creteSchema,
    updateSchema,
};
