import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.json({ success: true, data: user });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, bio, avatar } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;

  await user.save();

  res.json({ success: true, data: user });
});

/**
 * @desc    Update password
 * @route   PUT /api/users/password
 * @access  Private
 */
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }

  user.password = newPassword; // Will be hashed by pre-save hook
  await user.save();

  res.json({ success: true, message: "Password updated successfully" });
});

/**
 * @desc    Delete own account
 * @route   DELETE /api/users/account
 * @access  Private
 */
export const deleteAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ success: true, message: "Account deleted successfully" });
});
