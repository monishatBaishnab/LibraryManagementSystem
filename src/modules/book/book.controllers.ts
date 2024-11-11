import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.services";

// Controller function for find all books
const findAll = catchAsync(async (req, res) => {
  const result = await BookServices.findAllFromDB(req.query);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Books retrieved successfully.",
    data: result,
  });
});

// Controller function for find unique book using id
const findById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookServices.findByIdFromDB(id);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Book retrieved successfully.",
    data: result,
  });
});

// Controller function for create new book
const create = catchAsync(async (req, res) => {
  const result = await BookServices.createIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Book created successfully.",
    data: result,
  });
});

// Controller function for update existing book
const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookServices.updateFromDB(id, req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Books updated successfully.",
    data: result,
  });
});

// Controller function for delete existing book
const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BookServices.deleteFromDB(id);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Books successfully deleted.",
  });
});

export const BookControllers = {
    findAll,
    findById,
    create,
    update,
    deleteById
}