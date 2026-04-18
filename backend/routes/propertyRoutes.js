import express from "express";
import { body } from "express-validator";
import {
  createProperty,
  deleteProperty,
  getProperties,
  getPropertyById,
  updateProperty,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);

router.post(
  "/",
  protect,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("location").trim().notEmpty().withMessage("Location is required"),
    validateRequest,
  ],
  createProperty
);

router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;
