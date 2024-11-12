import { z } from "zod";

const createSchema = z.object({
  body: z.object({
    bookId: z.string(),
    memberId: z.string(),
    dueDate: z.string().optional(),
  }),
});

const updateSchema = z.object({
  body: z.object({
    borrowId: z.string(),
  }),
});

export const BorrowSchemas = {
  createSchema,
  updateSchema,
};
