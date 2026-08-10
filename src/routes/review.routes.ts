import { Router } from "express";
import * as ReviewController from "../services/review/review.controller.js";
import { auth } from "../lib/auth/auth.middleware.js"; // তোমার middleware file অনুযায়ী নাম মিলিয়ে নিয়ো

const router = Router();

router.post("/", auth, ReviewController.createReview);
router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.patch("/:id", auth, ReviewController.updateReview);
router.delete("/:id", auth, ReviewController.deleteReview);

export default router;
