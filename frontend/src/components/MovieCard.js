import React from "react";
import "../styles/MovieCard.css";

const MovieCard = ({ movie, onSelect }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.img || "https://via.placeholder.com/150"}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="genre">{movie.genre}</p>
        <p className="duration">{movie.duration_minutes} min</p>
        <p className="rating">⭐ {movie.rating || "N/A"}</p>
        <button className="btn-book" onClick={() => onSelect(movie)}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
