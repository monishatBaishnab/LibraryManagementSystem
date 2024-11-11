import { BorrowRecord } from "@prisma/client";

// Function for find all borrows
const findAllFromDB = async (query: Record<string, unknown>) => {};

// Function for borrow book
const createIntoDB = (payload: BorrowRecord) => {};

// Function for return borrowed book
const updateFromDB = (payload: Partial<BorrowRecord>) => {};

export const BorrowServices = {
  findAllFromDB,
  createIntoDB,
  updateFromDB,
};