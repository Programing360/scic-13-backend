import { type Request, type Response } from "express";
import catchAsync from "../../lib/catchAsync.js";
import sendResponse from "../../lib/sendResponse.js";
import * as ProductService from "./product.service.js";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId, search } = req.query;
    const result = await ProductService.getAllProducts({
      categoryId: categoryId as string,
      search: search as string,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  },
);

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductService.getProductById(req.params.id as string);
    if (!result) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Product not found",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product retrieved successfully",
      data: result,
    });
  },
);

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.updateProduct(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.softDeleteProduct(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});
