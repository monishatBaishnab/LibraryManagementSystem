"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRoutes = exports.BorrowRoutes = void 0;
const express_1 = require("express");
const borrowRouter = (0, express_1.Router)();
const returnRouter = (0, express_1.Router)();
// Route for get all borrows
borrowRouter.get("/");
// Route for create new borrow
borrowRouter.post("/");
// Route for update existing borrow
returnRouter.post("/");
exports.BorrowRoutes = borrowRouter;
exports.ReturnRoutes = returnRouter;
