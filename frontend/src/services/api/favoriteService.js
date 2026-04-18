import apiClient from "./client";

export const getFavorites = async () => {
  const { data } = await apiClient.get("/favorites");
  return data;
};

export const getFavoriteIds = async () => {
  const { data } = await apiClient.get("/favorites/ids");
  return data;
};

export const toggleFavorite = async (propertyId) => {
  const { data } = await apiClient.post(`/favorites/${propertyId}`);
  return data;
};

export const removeFavorite = async (propertyId) => {
  const { data } = await apiClient.delete(`/favorites/${propertyId}`);
  return data;
};
