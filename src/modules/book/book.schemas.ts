import { z } from "zod";

const creteSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required." })
      .min(1, { message: "Title cannot be empty." }),
    genre: z
      .string({ required_error: "Genre is required." })
      .min(1, { message: "Genre cannot be empty." }),
    publishedYear: z
      .number({ required_error: "Published year is required." })
      .int({ message: "Published year must be an integer." })
      .min(1000, { message: "Published year must be at least 1000." }),
    totalCopies: z
      .number({ required_error: "Total copies are required." })
      .int({ message: "Total copies must be an integer." })
      .positive({ message: "Total copies must be a positive number." }),
    availableCopies: z
      .number({ required_error: "Available copies are required." })
      .int({ message: "Available copies must be an integer." })
      .min(0, { message: "Available copies cannot be negative." })
  }),
});

const updateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publishedYear: z.number().optional(),
    totalCopies: z.number().optional(),
    availableCopies: z.number().optional(),
  }),
});

export const BookSchemas = {
  creteSchema,
  updateSchema,
};
