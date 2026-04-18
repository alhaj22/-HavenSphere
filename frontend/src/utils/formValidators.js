export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const isValidPassword = (password) => password && password.length >= 6;

export const isValidName = (name) => name && name.trim().length >= 2;

export const getErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred";

  // Axios error
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Validation errors from express-validator
  if (error.response?.data?.errors) {
    return error.response.data.errors.map((e) => e.msg).join(". ");
  }

  // Generic error
  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred";
};
