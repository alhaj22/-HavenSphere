import apiClient from "./client";

// ========== Analytics ==========

export const getAnalytics = async () => {
  const { data } = await apiClient.get("/admin/analytics");
  return data;
};

// ========== User Management ==========

export const getAllUsers = async (params = {}) => {
  const { data } = await apiClient.get("/admin/users", { params });
  return data;
};

export const getUserById = async (id) => {
  const { data } = await apiClient.get(`/admin/users/${id}`);
  return data;
};

export const createUser = async (payload) => {
  const { data } = await apiClient.post("/admin/users", payload);
  return data;
};

export const updateUser = async (id, payload) => {
  const { data } = await apiClient.put(`/admin/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await apiClient.delete(`/admin/users/${id}`);
  return data;
};

export const toggleBlockUser = async (id) => {
  const { data } = await apiClient.put(`/admin/users/${id}/block`);
  return data;
};

// ========== Property Management ==========

export const adminGetProperties = async (params = {}) => {
  const { data } = await apiClient.get("/admin/properties", { params });
  return data;
};

export const adminCreateProperty = async (payload) => {
  const { data } = await apiClient.post("/admin/properties", payload);
  return data;
};

export const adminUpdateProperty = async (id, payload) => {
  const { data } = await apiClient.put(`/admin/properties/${id}`, payload);
  return data;
};

export const adminDeleteProperty = async (id) => {
  const { data } = await apiClient.delete(`/admin/properties/${id}`);
  return data;
};

export const togglePropertyVisibility = async (id) => {
  const { data } = await apiClient.put(`/admin/properties/${id}/toggle`);
  return data;
};

// ========== Upload ==========

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await apiClient.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
