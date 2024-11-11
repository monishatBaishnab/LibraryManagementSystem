import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Controller function for find all borrows
const findAll = catchAsync(async (req, res) => {
  const result = "";

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Borrows retrieved successfully.",
    data: result,
  });
});

// Controller function for create new borrow
const create = catchAsync(async (req, res) => {
  const result = "";

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Book borrowed successfully",
    data: result,
  });
});

// Controller function for update existing borrow
const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = "";

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Book returned successfully",
    data: result,
  });
});

export const BorrowControllers = {
    findAll,
    create,
    update,
}