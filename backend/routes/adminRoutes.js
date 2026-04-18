import express from "express";
import { body } from "express-validator";
import {
  createUser,
  deleteUser,
  getAnalytics,
  getAllUsers,
  getUserById,
  toggleBlockUser,
  updateUser,
  adminCreateProperty,
  adminUpdateProperty,
  adminDeleteProperty,
  togglePropertyVisibility,
  adminGetProperties,
} from "../controllers/adminController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, authorizeRoles("admin"));

// Analytics
router.get("/analytics", getAnalytics);

// User management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

router.post(
  "/users",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .optional()
      .isIn(["user", "admin"])
      .withMessage("Role must be user or admin"),
    validateRequest,
  ],
  createUser
);

router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/block", toggleBlockUser);

// Property management
router.get("/properties", adminGetProperties);

router.post(
  "/properties",
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("location").trim().notEmpty().withMessage("Location is required"),
    validateRequest,
  ],
  adminCreateProperty
);

router.put("/properties/:id", adminUpdateProperty);
router.delete("/properties/:id", adminDeleteProperty);
router.put("/properties/:id/toggle", togglePropertyVisibility);

export default router;
