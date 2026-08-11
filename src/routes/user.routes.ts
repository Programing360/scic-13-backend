import { Router } from "express";
import * as UserController from "../services/user/user.controller.js";
import { auth, requireRole } from "../lib/auth/auth.middleware.js";

const router = Router();

// নিজের প্রোফাইল — যেকোনো logged-in user
router.get("/me", auth, UserController.getMyProfile);
router.patch("/me", auth, UserController.updateMyProfile);

// Admin-only — সব user দেখা/মুছা
router.get("/", auth, requireRole("ADMIN"), UserController.getAllUsers);
router.get("/:id", auth, requireRole("ADMIN"), UserController.getUserById);
router.delete("/:id", auth, requireRole("ADMIN"), UserController.deleteUser);

export default router;
