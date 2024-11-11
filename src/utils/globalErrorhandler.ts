import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const success: boolean = false;
  const status: number = err?.httpStatus || httpStatus.BAD_REQUEST;
  const message: string = err?.name || "Something want wrong.";
console.log(err);
  res.status(status).send({
    success,
    status,
    message,
  });
};

export default globalErrorHandler;
