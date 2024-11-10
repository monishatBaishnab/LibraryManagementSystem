import { z } from "zod";

// Create member info schema
const createSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    membershipDate: z.string().optional(),
  }),
});

// Update member info schema
const updateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    membershipDate: z.string().optional(),
  }),
});

export const MemberSchemas = {
  createSchema,
  updateSchema
};
