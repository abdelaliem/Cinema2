import client from "../api/client";

export const bookingService = {
  getHallSeats: (hallId) => client.get(`/halls/${hallId}/seats`),
  getShowtimeSeats: (showtimeId) =>
    client.get(`/showtimes/${showtimeId}/seats`),
  createBooking: (bookingData) => client.post("/bookings", bookingData),
  getUserBookings: (userId) => client.get(`/users/${userId}/bookings`),
  cancelBooking: (bookingId) => client.delete(`/bookings/${bookingId}`),
};

export default bookingService;
