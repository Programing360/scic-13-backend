import { type Request, type Response } from "express";
import catchAsync from "../../lib/catchAsync.js";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";
import * as CategoryService from "./category.service.js";
import sendResponse from "../../lib/sendResponse.js";

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const validated = createCategorySchema.parse(req.body);
    const result = await CategoryService.createCategory(validated);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created successfully",
      data: result,
    });
  },
);

export const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  },
);

export const getCategoryById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getCategoryById(req.params.id as string);
    if (!result) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Category not found",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category retrieved successfully",
      data: result,
    });
  },
);

export const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const validated = updateCategorySchema.parse(req.body);
    const result = await CategoryService.updateCategory(
      req.params.id as string,
      validated,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  },
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.softDeleteCategory(req.params.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  },
);
