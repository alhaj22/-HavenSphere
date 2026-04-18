import Property from "../models/Property.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get all properties (with search, filter, pagination)
 * @route   GET /api/properties
 * @access  Public
 */
export const getProperties = asyncHandler(async (req, res) => {
  const {
    search,
    type,
    status,
    minPrice,
    maxPrice,
    beds,
    baths,
    featured,
    sort = "-createdAt",
    page = 1,
    limit = 12,
    showInactive,
  } = req.query;

  const filter = {};

  // By default, only show active properties to public users
  if (showInactive !== "true") {
    filter.isActive = { $ne: false };
  }

  // Text search
  if (search) {
    filter.$text = { $search: search };
  }

  // Filters
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (featured === "true") filter.isFeatured = true;
  if (beds) filter.beds = { $gte: Number(beds) };
  if (baths) filter.baths = { $gte: Number(baths) };

  // Price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [properties, total] = await Promise.all([
    Property.find(filter)
      .populate("createdBy", "name email avatar")
      .sort(sort)
      .skip(skip)
      .limit(limitNum),
    Property.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: properties,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  });
});

/**
 * @desc    Get single property by ID
 * @route   GET /api/properties/:id
 * @access  Public
 */
export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate(
    "createdBy",
    "name email avatar phone"
  );

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  res.json({ success: true, data: property });
});

/**
 * @desc    Create property
 * @route   POST /api/properties
 * @access  Private
 */
export const createProperty = asyncHandler(async (req, res) => {
  const property = await Property.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, data: property });
});

/**
 * @desc    Update property
 * @route   PUT /api/properties/:id
 * @access  Private (owner or admin)
 */
export const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const isOwner = property.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized to update this property");
  }

  const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updated });
});

/**
 * @desc    Delete property
 * @route   DELETE /api/properties/:id
 * @access  Private (owner or admin)
 */
export const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const isOwner = property.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized to delete this property");
  }

  await property.deleteOne();
  res.json({ success: true, message: "Property deleted successfully" });
});
