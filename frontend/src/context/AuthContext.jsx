import { useEffect, useMemo, useState } from "react";
import { getMe, login, register } from "../services/api/authService";
import { AuthContext } from "./authContextInstance";

/**
 * Extracts only safe user fields (no password, no token in state).
 */
const sanitizeUser = (data) => {
  if (!data) return null;
  const { password, token, success, ...safe } = data;
  return safe;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await getMe();
        setUser(sanitizeUser(me));
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const loginUser = async (payload) => {
    setError("");
    const response = await login(payload);
    localStorage.setItem("token", response.token);
    setUser(sanitizeUser(response));
    return response;
  };

  const registerUser = async (payload) => {
    setError("");
    const response = await register(payload);
    localStorage.setItem("token", response.token);
    setUser(sanitizeUser(response));
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  /**
   * Refresh user data from server (e.g., after profile update).
   */
  const refreshUser = async () => {
    try {
      const me = await getMe();
      setUser(sanitizeUser(me));
    } catch {
      // silently fail
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      setError,
      loginUser,
      registerUser,
      logout,
      refreshUser,
    }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
