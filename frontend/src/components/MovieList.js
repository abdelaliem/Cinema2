import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import movieService from "../services/movieService";
import { useBooking } from "../context/BookingContext";
import "../styles/MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedMovie, setBookingStep } = useBooking();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await movieService.getAllMovies();
      setMovies(response.data.data || response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setBookingStep("showtimes");
  };

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list">
      <h2>Now Showing</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={handleSelectMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
