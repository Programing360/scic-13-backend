import { type Request, type Response } from "express";
import catchAsync from "../../lib/catchAsync.js";
import sendResponse from "../../lib/sendResponse.js";
import * as AuthService from "./auth.service.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

export const register = catchAsync(async (req: Request, res: Response) => {
  const validated = registerSchema.parse(req.body);
  const result = await AuthService.registerUser(validated);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const validated = loginSchema.parse(req.body);
  const result = await AuthService.loginUser(validated);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});