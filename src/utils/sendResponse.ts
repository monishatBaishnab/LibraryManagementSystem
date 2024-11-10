import { Response } from "express";

type TPayload<T> = {
  success: boolean;
  status: number;
  message: string;
  data?: T;
};

const sendResponse = <T>(res: Response, { success, status, message, data }: TPayload<T>) => {
  res.status(status).send({
    success,
    status,
    message,
    data,
  });
};

export default sendResponse;