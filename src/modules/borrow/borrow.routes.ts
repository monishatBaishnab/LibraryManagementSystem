import { Router } from "express";

const borrowRouter = Router();
const returnRouter = Router();

// Route for get all borrows
borrowRouter.get("/", );

// Route for create new borrow
borrowRouter.post("/", );

// Route for update existing borrow
returnRouter.post("/", );


export const BorrowRoutes = borrowRouter;
export const ReturnRoutes = returnRouter;