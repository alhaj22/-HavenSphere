import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";

/**
 * Protect routes — verifies JWT and attaches user to req.
 * Checks if user is blocked before allowing access.
 */
const protect = async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "Not authorized, user not found");
    }

    if (user.isBlocked) {
      throw new ApiError(403, "Your account has been blocked. Contact support.");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(401, "Not authorized, token invalid");
  }
};

/**
 * Restrict access to specific roles.
 * Must be used AFTER protect middleware.
 */
const authorizeRoles =
  (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You do not have permission to access this resource");
    }
    next();
  };

export { protect, authorizeRoles };
