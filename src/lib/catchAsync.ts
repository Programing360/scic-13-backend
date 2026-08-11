import { type NextFunction, type Request, type RequestHandler, type Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err); // এটা error কে globalErrorHandler-এ পাঠাবে
    }
  };
};

export default catchAsync;
