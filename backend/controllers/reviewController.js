import Review from "../models/Review.js";
import Property from "../models/Property.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get reviews for a property
 * @route   GET /api/properties/:propertyId/reviews
 * @access  Public
 */
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ property: req.params.propertyId })
    .populate("user", "name avatar")
    .sort("-createdAt");

  res.json({ success: true, data: reviews });
});

/**
 * @desc    Create review
 * @route   POST /api/properties/:propertyId/reviews
 * @access  Private
 */
export const createReview = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.propertyId);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  // Check if user already reviewed this property
  const existing = await Review.findOne({
    property: req.params.propertyId,
    user: req.user._id,
  });

  if (existing) {
    throw new ApiError(400, "You have already reviewed this property");
  }

  const review = await Review.create({
    ...req.body,
    property: req.params.propertyId,
    user: req.user._id,
  });

  res.status(201).json({ success: true, data: review });
});

/**
 * @desc    Update review
 * @route   PUT /api/properties/:propertyId/reviews/:id
 * @access  Private (owner)
 */
export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to update this review");
  }

  const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updated });
});

/**
 * @desc    Delete review
 * @route   DELETE /api/properties/:propertyId/reviews/:id
 * @access  Private (owner or admin)
 */
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  const isOwner = review.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized to delete this review");
  }

  await review.deleteOne();
  res.json({ success: true, message: "Review deleted" });
});
