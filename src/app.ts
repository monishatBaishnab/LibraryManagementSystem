import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["*"],
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).send({
    success: true,
    statusCode: httpStatus.OK,
    message: "Library Management System running smoothly...",
  });
});

export default app;
