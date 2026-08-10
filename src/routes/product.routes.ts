import { Router } from "express";
import * as ProductController from "../services/product/product.controller.js";
import { auth } from "../lib/auth/auth.middleware.js";

const router = Router();

router.post("/", auth, ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.patch("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
