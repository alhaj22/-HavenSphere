import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get bookings (user sees own, admin sees all)
 * @route   GET /api/bookings
 * @access  Private
 */
export const getBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const filter = req.user.role === "admin" ? {} : { user: req.user._id };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate("property", "title price location image")
      .populate("user", "name email")
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum),
    Booking.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: bookings,
    pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
  });
});

/**
 * @desc    Create booking
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.body.property);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const booking = await Booking.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({ success: true, data: booking });
});

/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id
 * @access  Private (owner or admin)
 */
export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const isOwner = booking.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized");
  }

  const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updated });
});

/**
 * @desc    Delete booking
 * @route   DELETE /api/bookings/:id
 * @access  Private (owner or admin)
 */
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  const isOwner = booking.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized");
  }

  await booking.deleteOne();
  res.json({ success: true, message: "Booking deleted" });
});
