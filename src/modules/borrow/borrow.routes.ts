import { Router } from "express";
import { BorrowControllers } from "./borrow.controllers";

const borrowRouter = Router();
const returnRouter = Router();

// Route for get all borrows
borrowRouter.get("/");

// Route for create new borrow
borrowRouter.post("/", BorrowControllers.borrowBook);

// Route for update existing borrow
returnRouter.post("/", BorrowControllers.returnBorrowedBook);

export const BorrowRoutes = borrowRouter;
export const ReturnRoutes = returnRouter;
