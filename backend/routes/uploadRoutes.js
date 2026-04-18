import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { uploadSingle, uploadMultiple } from "../middleware/uploadMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// All upload routes require authentication
router.use(protect);

/**
 * @desc    Upload a single image
 * @route   POST /api/upload
 * @access  Private
 */
router.post(
  "/",
  (req, res, next) => {
    uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "Upload failed",
        });
      }
      next();
    });
  },
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, data: { url: imageUrl, filename: req.file.filename } });
  })
);

/**
 * @desc    Upload multiple images
 * @route   POST /api/upload/multiple
 * @access  Private
 */
router.post(
  "/multiple",
  (req, res, next) => {
    uploadMultiple(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "Upload failed",
        });
      }
      next();
    });
  },
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const urls = req.files.map((f) => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename,
    }));

    res.json({ success: true, data: urls });
  })
);

export default router;
