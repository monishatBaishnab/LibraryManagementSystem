import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    status: httpStatus.NOT_FOUND,
    message: "Your requested route not found.",
  });
};

export default notFoundHandler;
