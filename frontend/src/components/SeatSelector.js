import React, { useEffect, useState } from "react";
import bookingService from "../services/bookingService";
import { useBooking } from "../context/BookingContext";
import "../styles/SeatSelector.css";

const SeatSelector = () => {
  const [seats, setSeats] = useState([]);
  const [seatsByRow, setSeatsByRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    selectedShowtime,
    selectedSeats,
    addSeat,
    removeSeat,
    setBookingStep,
  } = useBooking();

  useEffect(() => {
    if (selectedShowtime) {
      fetchSeats();
    }
  }, [selectedShowtime]);

  const fetchSeats = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getShowtimeSeats(
        selectedShowtime.id
      );
      const seatsData = response.data.data || response.data;
      setSeats(seatsData);

      const grouped = {};
      seatsData.forEach((seat) => {
        if (!grouped[seat.row_label]) {
          grouped[seat.row_label] = [];
        }
        grouped[seat.row_label].push(seat);
      });
      setSeatsByRow(grouped);
      setError(null);
    } catch (err) {
      console.error("Error fetching seats:", err);
      setError("Failed to load seats.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatId, isBooked) => {
    if (isBooked) return;
    if (selectedSeats.includes(seatId)) {
      removeSeat(seatId);
    } else {
      addSeat(seatId);
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length > 0) {
      setBookingStep("checkout");
    }
  };

  if (loading) return <div className="loading">Loading seats...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="seat-selector">
      <h2>Select Your Seats</h2>
      <div className="screen">SCREEN</div>
      <div className="seats-container">
        {Object.keys(seatsByRow)
          .sort()
          .map((row) => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              <div className="seats">
                {seatsByRow[row].map((seat) => (
                  <button
                    key={seat.id}
                    className={`seat ${seat.is_available === false ? "booked" : ""} ${
                      selectedSeats.includes(seat.id) ? "selected" : ""
                    }`}
                    onClick={() => handleSeatClick(seat.id, seat.is_available === false)}
                    disabled={seat.is_available === false}
                    title={`${row}${seat.number}`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
              <span className="row-label">{row}</span>
            </div>
          ))}
      </div>
      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat available"></div> Available
        </div>
        <div className="legend-item">
          <div className="seat selected"></div> Selected
        </div>
        <div className="legend-item">
          <div className="seat booked"></div> Booked
        </div>
      </div>
      <div className="seat-actions">
        <p>Selected: {selectedSeats.length} seat(s)</p>
        <button
          className="btn-proceed"
          onClick={handleProceed}
          disabled={selectedSeats.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default SeatSelector;
