import client from "../api/client";

export const movieService = {
  getAllMovies: () => client.get("/movies"),
  getMovieById: (id) => client.get(`/movies/${id}`),
  getShowtimes: (movieId) => client.get(`/movies/${movieId}/showtimes`),
};

export default movieService;
