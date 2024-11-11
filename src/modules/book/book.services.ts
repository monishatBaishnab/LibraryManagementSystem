import { Book } from "@prisma/client";
import calculatePaginate from "../../utils/calculatePaginate";
import whereConditionsBuilder from "../../utils/whereConditionsBuilder";
import prisma from "../../utils/prismaClient";
import { bookFilterKeys, bookSearchFields } from "./book.constants";

// Function for find all books
const findAllFromDB = async (query: Record<string, unknown>) => {
  const { limit, skip, sortBy, sortOrder } = calculatePaginate(query);
  const whereConditions = whereConditionsBuilder(query, bookSearchFields, bookFilterKeys);

  const books = await prisma.book.findMany({
    where: {
      AND: whereConditions,
    },
    skip: skip,
    take: limit,
    orderBy: { [sortBy ?? 'title']: sortOrder },
  });

  return books;
};

// Function for find unique book using book id
const findByIdFromDB = async (id: string) => {
  const book = await prisma.book.findUnique({
    where: { bookId: id },
  });

  return book;
};

// Function for create new book
const createIntoDB = async (payload: Book) => {
  const createdBook = await prisma.book.create({
    data: payload,
  });

  return createdBook;
};

// Function for update existing book
const updateFromDB = async (id: string, payload: Partial<Book>) => {
  // Check book is exists or not. if not the throw an error.
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId: id,
    },
  });

  const updatedBook = await prisma.book.update({
    data: payload,
    where: { bookId: id },
  });

  return updatedBook;
};

// Function for delete existing book
const deleteFromDB = async (id: string) => {
  // Check book is exists or not. if not the throw an error.
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId: id,
    },
  });

  await prisma.book.delete({
    where: { bookId: id },
  });
};

export const BookServices = {
  findAllFromDB,
  findByIdFromDB,
  createIntoDB,
  updateFromDB,
  deleteFromDB,
};
