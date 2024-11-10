import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import globalErrorHandler from "./utils/globalErrorhandler";
import notFoundHandler from "./utils/notFoundHandler";
import { appRoutes } from "./routes/routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["*"],
  })
);
app.use(cookieParser());

// Route for check server health
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).send({
    success: true,
    statusCode: httpStatus.OK,
    message: "Library Management System running smoothly...",
  });
});

// Call the app routes
app.use("/api", appRoutes);

// Path Error Handler
app.use("*", notFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
