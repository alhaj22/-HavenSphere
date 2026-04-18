import express from "express";
import { body } from "express-validator";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", protect, getBookings);

router.post(
  "/",
  protect,
  [
    body("property").notEmpty().withMessage("Property ID is required"),
    body("date").isISO8601().withMessage("Valid date required"),
    validateRequest,
  ],
  createBooking
);

router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);

export default router;
