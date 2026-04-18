import apiClient from "./client";

export const getProperties = async (params = {}) => {
  const { data } = await apiClient.get("/properties", { params });
  return data;
};

export const getPropertyById = async (id) => {
  const { data } = await apiClient.get(`/properties/${id}`);
  return data;
};

export const createProperty = async (payload) => {
  const { data } = await apiClient.post("/properties", payload);
  return data;
};

export const updateProperty = async (id, payload) => {
  const { data } = await apiClient.put(`/properties/${id}`, payload);
  return data;
};

export const deleteProperty = async (id) => {
  const { data } = await apiClient.delete(`/properties/${id}`);
  return data;
};
