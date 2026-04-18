import apiClient from "./client";

// ========== Profile ==========

export const getProfile = async () => {
  const { data } = await apiClient.get("/users/profile");
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await apiClient.put("/users/profile", payload);
  return data;
};

export const updatePassword = async (payload) => {
  const { data } = await apiClient.put("/users/password", payload);
  return data;
};

export const deleteAccount = async () => {
  const { data } = await apiClient.delete("/users/account");
  return data;
};
