import { BorrowRecord } from "@prisma/client";
import prisma from "../../utils/prismaClient";
import HttpError from "../../errors/HttpError";
import httpStatus from "http-status";

// Function for find all borrows
const findOverDueBorrowsFromDB = async () => {
  const overDueBorrows = await prisma.borrowRecord.findMany({
    where: {
      OR: [
        {
          returnDate: {
            gt: prisma.borrowRecord.fields.dueDate,
          },
        },
        {
          AND: [
            { returnDate: null },
            {
              dueDate: {
                lt: new Date().toISOString(),
              },
            },
          ],
        },
      ],
    },
    select: {
      borrowId: true,
      returnDate: true,
      dueDate: true,
      book: { select: { title: true } },
      member: { select: { name: true } },
    },
  });

  const filteredOverdueBorrows = overDueBorrows?.map((borrow) => {
    let overdueTimes = 0;
    const dueDate = new Date(borrow.dueDate);

    // Set overdue days
    if (borrow.returnDate) {
      const returnDate = new Date(borrow.returnDate);
      overdueTimes = returnDate.getTime() - dueDate.getTime();
    } else {
      const returnDate = new Date();
      overdueTimes = returnDate.getTime() - dueDate.getTime();
    }

    return {
      borrowId: borrow.borrowId,
      bookTitle: borrow.book.title,
      borrowerName: borrow.member.name,
      overdueDays: Math.floor(overdueTimes / (1000 * 3600 * 24)),
    };
  });

  return filteredOverdueBorrows;
};

// Function for borrow book
const borrowBookFromDB = async (payload: BorrowRecord) => {
  // Check book exists or not
  const bookData = await prisma.book.findUniqueOrThrow({
    where: {
      bookId: payload.bookId,
    },
  });

  if (Number(bookData?.availableCopies) < 1) {
    throw new HttpError(httpStatus.CONFLICT, "No copies available of this book");
  }

  //Check member exists or not
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: payload.memberId,
    },
  });

  // Create due date after next 14 days
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

  const borrowData = {
    ...payload,
    dueDate: payload?.dueDate ? payload?.dueDate : dueDate,
  };

  // implement prisma transaction for borrow book
  const createdBorrow = prisma.$transaction(async (transactionClient) => {
    // create borrow
    const borrow = await transactionClient.borrowRecord.create({
      data: borrowData,
    });

    // Update the available quantity of this book
    await transactionClient.book.update({
      data: {
        availableCopies: Number(bookData.availableCopies) - 1,
      },
      where: { bookId: payload.bookId },
    });

    return {
      borrowId: borrow.borrowId,
      bookId: borrow.bookId,
      memberId: borrow.memberId,
      borrowDate: borrow.borrowDate,
    };
  });

  return createdBorrow;
};

// Function for return borrowed book
const returnBorrowedBookFromDB = async (payload: Partial<BorrowRecord>) => {
  // Check borrow exists or not
  const borrowData = await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId: payload.borrowId,
    },
  });

  if (borrowData.returnDate !== null) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Book already returned.");
  }

  // Check book exists or not
  const bookData = await prisma.book.findUniqueOrThrow({
    where: { bookId: borrowData.bookId },
    select: { availableCopies: true, bookId: true },
  });

  // create current date for provide return date
  // Date.now() + 16 * 24 * 60 * 60 * 1000 for after 16 days
  const currentDate = new Date().toISOString();

  // Implement prisma transaction for return borrowed book
  await prisma.$transaction(async (transactionClient) => {
    // Update borrow data
    await transactionClient.borrowRecord.update({
      data: {
        returnDate: currentDate,
      },
      where: {
        borrowId: payload.borrowId,
      },
    });

    // Update the available quantity of this book
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
  findOverDueBorrowsFromDB,
  borrowBookFromDB,
  returnBorrowedBookFromDB,
};
