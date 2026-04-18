import Favorite from "../models/Favorite.js";
import Property from "../models/Property.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get current user's favorites
 * @route   GET /api/favorites
 * @access  Private
 */
export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id })
    .populate({
      path: "property",
      select: "title price location image beds baths area type status badge isFeatured isActive",
    })
    .sort("-createdAt");

  // Filter out deleted or inactive properties
  const activeFavorites = favorites.filter((f) => f.property && f.property.isActive !== false);

  res.json({
    success: true,
    data: activeFavorites,
  });
});

/**
 * @desc    Get list of favorite property IDs (for quick lookup)
 * @route   GET /api/favorites/ids
 * @access  Private
 */
export const getFavoriteIds = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id }).select("property");
  const ids = favorites.map((f) => f.property.toString());
  res.json({ success: true, data: ids });
});

/**
 * @desc    Toggle favorite (add if not exists, remove if exists)
 * @route   POST /api/favorites/:propertyId
 * @access  Private
 */
export const toggleFavorite = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const existing = await Favorite.findOne({
    user: req.user._id,
    property: propertyId,
  });

  if (existing) {
    await existing.deleteOne();
    return res.json({ success: true, message: "Removed from favorites", favorited: false });
  }

  await Favorite.create({ user: req.user._id, property: propertyId });
  res.status(201).json({ success: true, message: "Added to favorites", favorited: true });
});

/**
 * @desc    Remove from favorites
 * @route   DELETE /api/favorites/:propertyId
 * @access  Private
 */
export const removeFavorite = asyncHandler(async (req, res) => {
  const result = await Favorite.findOneAndDelete({
    user: req.user._id,
    property: req.params.propertyId,
  });

  if (!result) {
    throw new ApiError(404, "Favorite not found");
  }

  res.json({ success: true, message: "Removed from favorites" });
});
