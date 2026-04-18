import express from "express";
import { body } from "express-validator";
import {
  deleteAccount,
  getProfile,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get("/profile", getProfile);

router.put(
  "/profile",
  [body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"), validateRequest],
  updateProfile
);

router.put(
  "/password",
  [
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    validateRequest,
  ],
  updatePassword
);

router.delete("/account", deleteAccount);

export default router;
