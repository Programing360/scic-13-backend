import { type NextFunction, type Request, type Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client.js";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: unknown = undefined;

  // Zod validation error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errorDetails = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }
  // Prisma known errors (unique constraint, foreign key, not found, etc.)
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = `Duplicate value for field: ${err.meta?.target}`;
    } else if (err.code === "P2003") {
      statusCode = 400;
      message = "Invalid reference — related record not found";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    } else {
      statusCode = 400;
      message = "Database error";
    }
  }
  // Custom thrown errors (e.g. from auth.service.ts)
  else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    ...(errorDetails ? { errors: errorDetails } : {}),
  });
};
