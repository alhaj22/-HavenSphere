import apiClient from "./client";

export const getReviews = async (propertyId) => {
  const { data } = await apiClient.get(`/properties/${propertyId}/reviews`);
  return data;
};

export const createReview = async (propertyId, payload) => {
  const { data } = await apiClient.post(`/properties/${propertyId}/reviews`, payload);
  return data;
};

export const updateReview = async (propertyId, reviewId, payload) => {
  const { data } = await apiClient.put(`/properties/${propertyId}/reviews/${reviewId}`, payload);
  return data;
};

export const deleteReview = async (propertyId, reviewId) => {
  const { data } = await apiClient.delete(`/properties/${propertyId}/reviews/${reviewId}`);
  return data;
};
