import express from "express";
import {
  getFavorites,
  getFavoriteIds,
  toggleFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get("/", getFavorites);
router.get("/ids", getFavoriteIds);
router.post("/:propertyId", toggleFavorite);
router.delete("/:propertyId", removeFavorite);

export default router;
