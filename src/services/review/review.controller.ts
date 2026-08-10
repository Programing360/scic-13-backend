import { type Request, type Response } from "express";
import catchAsync from "../../lib/catchAsync.js";
import { createReviewSchema, updateReviewSchema } from "./review.validation.js";
import * as ReviewService from "./review.service.js";
import sendResponse from "../../lib/sendResponse.js";


export const createReview = catchAsync(async (req: Request, res: Response) => {
  const validated = createReviewSchema.parse(req.body);
  const userId = (req as any).user.id; // auth middleware থেকে আসবে
  const result = await ReviewService.createReview({ ...validated, userId });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

export const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.query;
  const result = await ReviewService.getAllReviews(productId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

export const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviewById(req.params.id as string);
  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Review not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});

export const updateReview = catchAsync(async (req: Request, res: Response) => {
  const validated = updateReviewSchema.parse(req.body);
  const result = await ReviewService.updateReview(req.params.id as string , validated);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

export const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.softDeleteReview(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});