import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/api";
import type { Movie } from "../services/api";
import "./MoviePage.css";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const movieData = await getMovieById(id);
          setMovie(movieData);
        } catch {
          setError("Failed to fetch movie data.");
        } finally {
          setLoading(false);
        }
      };

      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750.png?text=No+Image";

  return (
    <div className="movie-page">
      <img src={posterUrl} alt={movie.title} className="movie-page-poster" />
      <div className="movie-page-details">
        <h1>
          {movie.title} ({new Date(movie.release_date).getFullYear()})
        </h1>
        <p>{movie.overview}</p>
        <p>
          <strong>Average Score:</strong> {movie.vote_average}
        </p>
      </div>
    </div>
  );
};

export default MoviePage;