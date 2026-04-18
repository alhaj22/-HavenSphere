/**
 * Wraps an async route handler so that rejected promises
 * are forwarded to Express error middleware automatically.
 * Express 5 does NOT auto-catch async throws in all edge cases,
 * so we keep this wrapper for safety.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
