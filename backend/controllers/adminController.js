import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get admin dashboard analytics
 * @route   GET /api/admin/analytics
 * @access  Private/Admin
 */
export const getAnalytics = asyncHandler(async (_req, res) => {
  const [totalUsers, totalProperties, totalBookings, totalReviews, recentUsers, recentProperties] =
    await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Booking.countDocuments(),
      Review.countDocuments(),
      User.find().sort("-createdAt").limit(5).select("name email role createdAt"),
      Property.find().sort("-createdAt").limit(5).select("title price location status createdAt"),
    ]);

  // Bookings by status
  const bookingsByStatus = await Booking.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // Properties by type
  const propertiesByType = await Property.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  res.json({
    success: true,
    data: {
      counts: {
        users: totalUsers,
        properties: totalProperties,
        bookings: totalBookings,
        reviews: totalReviews,
      },
      bookingsByStatus,
      propertiesByType,
      recentUsers,
      recentProperties,
    },
  });
});

/**
 * @desc    Get all users (admin)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const { search, role, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (role) filter.role = role;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [users, total] = await Promise.all([
    User.find(filter).sort("-createdAt").skip(skip).limit(limitNum),
    User.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: users,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

/**
 * @desc    Get single user (admin)
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.json({ success: true, data: user });
});

/**
 * @desc    Create user (admin)
 * @route   POST /api/admin/users
 * @access  Private/Admin
 */
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already registered");
  }

  const user = await User.create({ name, email, password, role });
  res.status(201).json({ success: true, data: user });
});

/**
 * @desc    Update user (admin)
 * @route   PUT /api/admin/users/:id
 * @access  Private/Admin
 */
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { name, email, role, phone, bio, isBlocked } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (phone !== undefined) user.phone = phone;
  if (bio !== undefined) user.bio = bio;
  if (isBlocked !== undefined) user.isBlocked = isBlocked;

  await user.save();
  res.json({ success: true, data: user });
});

/**
 * @desc    Delete user (admin)
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "admin") {
    throw new ApiError(400, "Cannot delete admin accounts from this endpoint");
  }

  await user.deleteOne();
  res.json({ success: true, message: "User deleted successfully" });
});

/**
 * @desc    Block/unblock user (admin)
 * @route   PUT /api/admin/users/:id/block
 * @access  Private/Admin
 */
export const toggleBlockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "admin") {
    throw new ApiError(400, "Cannot block admin accounts");
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    success: true,
    message: user.isBlocked ? "User blocked" : "User unblocked",
    data: user,
  });
});

// ==================== PROPERTY MANAGEMENT ====================

/**
 * @desc    Admin create property
 * @route   POST /api/admin/properties
 * @access  Private/Admin
 */
export const adminCreateProperty = asyncHandler(async (req, res) => {
  const property = await Property.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, data: property });
});

/**
 * @desc    Admin update property
 * @route   PUT /api/admin/properties/:id
 * @access  Private/Admin
 */
export const adminUpdateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updated });
});

/**
 * @desc    Admin delete property
 * @route   DELETE /api/admin/properties/:id
 * @access  Private/Admin
 */
export const adminDeleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  await property.deleteOne();
  res.json({ success: true, message: "Property deleted successfully" });
});

/**
 * @desc    Toggle property visibility (active/inactive)
 * @route   PUT /api/admin/properties/:id/toggle
 * @access  Private/Admin
 */
export const togglePropertyVisibility = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  property.isActive = !property.isActive;
  await property.save();

  res.json({
    success: true,
    message: property.isActive ? "Property is now visible" : "Property hidden from listings",
    data: property,
  });
});

/**
 * @desc    Get all properties for admin (includes inactive)
 * @route   GET /api/admin/properties
 * @access  Private/Admin
 */
export const adminGetProperties = asyncHandler(async (req, res) => {
  const { search, type, status, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }
  if (type) filter.type = type;
  if (status) filter.status = status;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [properties, total] = await Promise.all([
    Property.find(filter)
      .populate("createdBy", "name email")
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum),
    Property.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: properties,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

