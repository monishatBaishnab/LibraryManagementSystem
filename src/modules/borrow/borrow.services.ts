import { BorrowRecord } from "@prisma/client";
import prisma from "../../utils/prismaClient";

// Function for find all borrows
const findAllFromDB = async (query: Record<string, unknown>) => {};

// Function for borrow book
const borrowBookFromDB = async (payload: BorrowRecord) => {
  // Check book exists or not
  const bookData = await prisma.book.findUniqueOrThrow({
    where: {
      bookId: payload.bookId,
    },
  });

  if (Number(bookData?.availableCopies) < 1) {
    throw new Error("No copies available of this book");
  }

  //Check member exists or not
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: payload.memberId,
    },
  });

  const createdBorrow = prisma.$transaction(async (transactionClient) => {
    const borrowData = await transactionClient.borrowRecord.create({
      data: payload,
    });

    await transactionClient.book.update({
      data: {
        availableCopies: Number(bookData.availableCopies) - 1,
      },
      where: { bookId: payload.bookId },
    });

    return borrowData;
  });

  return createdBorrow;
};

// Function for return borrowed book
const returnBorrowedBookFromDB = async (payload: Partial<BorrowRecord>) => {
  const borrowData = await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId: payload.borrowId,
    },
  });

  const bookData = await prisma.book.findUniqueOrThrow({
    where: { bookId: borrowData.bookId },
    select: { availableCopies: true, bookId: true },
  });

  const currentDate = new Date().toISOString();

  await prisma.$transaction(async (transactionClient) => {
    await transactionClient.borrowRecord.update({
      data: {
        returnDate: currentDate,
      },
      where: {
        borrowId: payload.borrowId,
      },
    });

    await transactionClient.book.update({
      data: {
        availableCopies: Number(bookData.availableCopies) + 1,
      },
      where: {
        bookId: bookData.bookId,
      },
    });
  });
};

export const BorrowServices = {
  findAllFromDB,
  borrowBookFromDB,
  returnBorrowedBookFromDB,
};
