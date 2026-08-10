import { Router } from "express";
import * as CategoryController from "../services/category/category.controller.js";

const router = Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
