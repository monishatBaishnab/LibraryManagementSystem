import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import HttpError from "../errors/HttpError";
import { Prisma } from "@prisma/client";
import handlePrismaError from "../errors/handlePrismaError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const success: boolean = false;
  let status: number = err?.statusCode || httpStatus.BAD_REQUEST;
  let message: string = err?.name || "Something want wrong.";

  // console.log(err);
  if (err instanceof ZodError) {
    message = "Validation failed, check the input data for errors.";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = handlePrismaError(err);
    message = prismaError.message;
    status = prismaError.statusCode;
  } else if (err instanceof HttpError) {
    status = err.statusCode;
    message = err.message;
  }

  res.status(status).send({
    success,
    status,
    message,
  });
};

export default globalErrorHandler;
