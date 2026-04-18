import apiClient from "./client";

export const getBookings = async (params = {}) => {
  const { data } = await apiClient.get("/bookings", { params });
  return data;
};

export const createBooking = async (payload) => {
  const { data } = await apiClient.post("/bookings", payload);
  return data;
};

export const updateBooking = async (id, payload) => {
  const { data } = await apiClient.put(`/bookings/${id}`, payload);
  return data;
};

export const deleteBooking = async (id) => {
  const { data } = await apiClient.delete(`/bookings/${id}`);
  return data;
};
