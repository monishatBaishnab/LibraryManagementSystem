import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BorrowServices } from "./borrow.services";

// Controller function for find all borrows
const findOverDueBorrows = catchAsync(async (req, res) => {
  const result = await BorrowServices.findOverDueBorrowsFromDB();

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: Object.keys(result)?.length ? "Overdue borrow list fetched." : "No overdue books",
    data: result,
  });
});

// Controller function for create new borrow
const borrowBook = catchAsync(async (req, res) => {
  const result = await BorrowServices.borrowBookFromDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Book borrowed successfully",
    data: result,
  });
});

// Controller function for update existing borrow
const returnBorrowedBook = catchAsync(async (req, res) => {
  const result = await BorrowServices.returnBorrowedBookFromDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Book returned successfully",
    data: result,
  });
});

export const BorrowControllers = {
  findOverDueBorrows,
  borrowBook,
  returnBorrowedBook,
};
