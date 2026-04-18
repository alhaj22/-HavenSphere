import express from "express";
import { body } from "express-validator";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router({ mergeParams: true });

router.get("/", getReviews);

router.post(
  "/",
  protect,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment").trim().notEmpty().withMessage("Comment is required"),
    validateRequest,
  ],
  createReview
);

router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;
