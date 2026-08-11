import { type Request, type Response } from "express";
import catchAsync from "../../lib/catchAsync.js";
import sendResponse from "../../lib/sendResponse.js";
import * as UserService from "./user.service.js";
import { updateUserSchema } from "./user.validation.js";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.user!.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserById(req.params.id as string);
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const updateMyProfile = catchAsync(
  async (req: Request, res: Response) => {
    const validated = updateUserSchema.parse(req.body);
    const result = await UserService.updateUser(req.user!.id, validated);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  },
);

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.softDeleteUser(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
