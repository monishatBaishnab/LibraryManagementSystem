import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberServices } from "./member.services";

// Controller function for find all members
const findAll = catchAsync(async (req, res) => {
  const result = await MemberServices.findAllFromDB();

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Members retrieved successfully",
    data: result,
  });
});

// Controller function for find single member
const findById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.findByIdFromDB(id);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Member retrieved successfully",
    data: result,
  });
});

// Controller function for create new member
const create = catchAsync(async (req, res) => {
  const result = await MemberServices.createIntoDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Member created successfully",
    data: result,
  });
});

// Controller function for update existing member information
const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.updateFromDB(id, req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Member updated successfully",
    data: result,
  });
});

// Controller function for update existing member
const deleteMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.deleteFromDB(id);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Member successfully deleted",
    data: result,
  });
});

export const MemberControllers = {
  findAll,
  findById,
  create,
  update,
  deleteMember,
};
