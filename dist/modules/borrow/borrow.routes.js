"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRoutes = exports.BorrowRoutes = void 0;
const express_1 = require("express");
const borrow_controllers_1 = require("./borrow.controllers");
const borrowRouter = (0, express_1.Router)();
const returnRouter = (0, express_1.Router)();
// Route for get all borrows
borrowRouter.get("/");
// Route for create new borrow
borrowRouter.post("/", borrow_controllers_1.BorrowControllers.borrowBook);
// Route for update existing borrow
returnRouter.post("/", borrow_controllers_1.BorrowControllers.returnBorrowedBook);
exports.BorrowRoutes = borrowRouter;
exports.ReturnRoutes = returnRouter;
