/**
 * Custom API error class that carries an HTTP status code.
 * Throw this from any controller and the error middleware
 * will format the response correctly.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
