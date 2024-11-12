import { Router } from "express";
import { BorrowControllers } from "./borrow.controllers";
import validateRequest from "../../utils/validateRequest";
import { BorrowSchemas } from "./borrow.schemas";

const borrowRouter = Router();
const returnRouter = Router();

// Route for get all borrows
borrowRouter.get("/overdue", BorrowControllers.findOverDueBorrows);

// Route for create new borrow
borrowRouter.post("/", validateRequest(BorrowSchemas.createSchema), BorrowControllers.borrowBook);

// Route for update existing borrow
returnRouter.post(
  "/",
  validateRequest(BorrowSchemas.updateSchema),
  BorrowControllers.returnBorrowedBook
);

export const BorrowRoutes = borrowRouter;
export const ReturnRoutes = returnRouter;
