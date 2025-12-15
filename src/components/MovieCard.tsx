import { useContext } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../services/api";
import "./MovieCard.css";
import { FaHeart, FaEye } from "react-icons/fa";
import { ListsContext } from "../contexts/ListsContext";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const {
    likedMovies,
    watchlist,
    addLikedMovie,
    removeLikedMovie,
    addToWatchlist,
    removeFromWatchlist,
  } = useContext(ListsContext);

  const isLiked = likedMovies.some((m) => m.id === movie.id);
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      removeLikedMovie(movie.id);
    } else {
      addLikedMovie(movie);
    }
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750.png?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={posterUrl} alt={movie.title} />

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <span>{movie.vote_average}</span>
      </div>

      <div className="movie-actions">
        <button onClick={handleLikeClick}>
          <FaHeart className={isLiked ? "gold" : ""} />
        </button>
        <button onClick={handleWatchlistClick}>
          <FaEye className={isInWatchlist ? "gold" : ""} />
        </button>
      </div>
    </Link>
  );
}
