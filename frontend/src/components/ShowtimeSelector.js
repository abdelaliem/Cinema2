import React, { useEffect, useState } from "react";
import movieService from "../services/movieService";
import { useBooking } from "../context/BookingContext";
import { formatDate, formatTime } from "../utils/helpers";
import "../styles/ShowtimeSelector.css";

const ShowtimeSelector = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedMovie, setSelectedShowtime, setBookingStep } = useBooking();

  useEffect(() => {
    if (selectedMovie) {
      fetchShowtimes();
    }
  }, [selectedMovie]);

  const fetchShowtimes = async () => {
    try {
      setLoading(true);
      const response = await movieService.getShowtimes(selectedMovie.id);
      setShowtimes(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching showtimes:", err);
      setError("Failed to load showtimes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectShowtime = (showtime) => {
    setSelectedShowtime(showtime);
    setBookingStep("seats");
  };

  if (loading) return <div className="loading">Loading showtimes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="showtime-selector">
      <h2>Select Showtime - {selectedMovie?.title}</h2>
      <div className="showtimes-grid">
        {showtimes.map((showtime) => (
          <div key={showtime.id} className="showtime-card">
            <p className="date">{formatDate(showtime.date)}</p>
            <p className="time">{formatTime(showtime.start_time)}</p>
            <p className="hall">Hall {showtime.hall?.name}</p>
            <p className="available-seats">
              {showtime.available_seats || "0"} seats available
            </p>
            <button
              className="btn-select"
              onClick={() => handleSelectShowtime(showtime)}
              disabled={!showtime.available_seats}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowtimeSelector;
