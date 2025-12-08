import React, { useState } from "react";
import bookingService from "../services/bookingService";
import { useBooking } from "../context/BookingContext";
import { calculateTotalPrice, formatDate, formatTime } from "../utils/helpers";
import "../styles/CheckoutForm.css";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { selectedMovie, selectedShowtime, selectedSeats, resetBooking } =
    useBooking();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const bookingPayload = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        showtime_id: selectedShowtime.id,
        seat_ids: selectedSeats,
      };

      await bookingService.createBooking(bookingPayload);
      setSuccess(true);
      setTimeout(() => {
        resetBooking();
      }, 2000);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError(
        err.response?.data?.message ||
          "Failed to complete booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <h3>✓ Booking Successful!</h3>
        <p>Your booking has been confirmed. Check your email for details.</p>
      </div>
    );
  }

  const totalPrice = calculateTotalPrice(
    selectedSeats,
    selectedMovie?.price || 10
  );

  return (
    <div className="checkout-form">
      <h2>Complete Your Booking</h2>

      <div className="booking-summary">
        <div className="summary-item">
          <strong>Movie:</strong> {selectedMovie?.title}
        </div>
        <div className="summary-item">
          <strong>Date & Time:</strong> {formatDate(selectedShowtime?.date)}{" "}
          {formatTime(selectedShowtime?.start_time)}
        </div>
        <div className="summary-item">
          <strong>Seats:</strong> {selectedSeats.join(", ")}
        </div>
        <div className="summary-item total-price">
          <strong>Total Price:</strong> ${totalPrice}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="user_name">Full Name *</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_email">Email *</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_phone">Phone Number *</label>
          <input
            type="tel"
            id="user_phone"
            name="user_phone"
            value={formData.user_phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
