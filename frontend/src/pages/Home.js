import React from "react";
import MovieList from "../components/MovieList";
import ShowtimeSelector from "../components/ShowtimeSelector";
import SeatSelector from "../components/SeatSelector";
import CheckoutForm from "../components/CheckoutForm";
import { useBooking } from "../context/BookingContext";
import "../styles/Home.css";

const Home = () => {
  const { bookingStep, resetBooking, selectedMovie } = useBooking();

  return (
    <div className="home">
      <div className="booking-container">
        <div className="booking-progress">
          <div
            className={`step ${
              bookingStep === "movies" ? "active" : "completed"
            }`}
          >
            <span>1. Movies</span>
          </div>
          <div
            className={`step ${bookingStep === "showtimes" ? "active" : ""}`}
          >
            <span>2. Showtimes</span>
          </div>
          <div className={`step ${bookingStep === "seats" ? "active" : ""}`}>
            <span>3. Seats</span>
          </div>
          <div className={`step ${bookingStep === "checkout" ? "active" : ""}`}>
            <span>4. Checkout</span>
          </div>
        </div>

        <div className="booking-content">
          {bookingStep === "movies" && <MovieList />}
          {bookingStep === "showtimes" && <ShowtimeSelector />}
          {bookingStep === "seats" && <SeatSelector />}
          {bookingStep === "checkout" && <CheckoutForm />}
        </div>

        {selectedMovie && bookingStep !== "movies" && (
          <button className="btn-back" onClick={resetBooking}>
            ← Start Over
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
