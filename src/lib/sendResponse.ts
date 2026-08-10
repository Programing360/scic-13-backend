import { type Response } from "express";

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

const sendResponse = <T>(res: Response, payload: ApiResponse<T>) => {
  res.status(payload.statusCode).json({
    success: payload.success,
    message: payload.message,
    data: payload.data || null,
  });
};

export default sendResponse;