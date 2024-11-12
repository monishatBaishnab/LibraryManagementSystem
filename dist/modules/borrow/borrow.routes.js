"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRoutes = exports.BorrowRoutes = void 0;
const express_1 = require("express");
const borrow_controllers_1 = require("./borrow.controllers");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const borrow_schemas_1 = require("./borrow.schemas");
const borrowRouter = (0, express_1.Router)();
const returnRouter = (0, express_1.Router)();
// Route for get all borrows
borrowRouter.get("/overdue", borrow_controllers_1.BorrowControllers.findOverDueBorrows);
// Route for create new borrow
borrowRouter.post("/", (0, validateRequest_1.default)(borrow_schemas_1.BorrowSchemas.createSchema), borrow_controllers_1.BorrowControllers.borrowBook);
// Route for update existing borrow
returnRouter.post("/", (0, validateRequest_1.default)(borrow_schemas_1.BorrowSchemas.updateSchema), borrow_controllers_1.BorrowControllers.returnBorrowedBook);
exports.BorrowRoutes = borrowRouter;
exports.ReturnRoutes = returnRouter;
