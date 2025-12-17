import { useContext } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../services/api";
import "./MovieCard.css";
import { FaHeart, FaEye } from "react-icons/fa";
import { ListsContext } from "../contexts/ListsContext";
import { useAuth } from "../contexts/AuthContext";

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

  const { isAuthenticated, user } = useAuth();

  const isLiked = likedMovies.some((m) => m.id === movie.id);
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) return;

   try {
    const response = await fetch(
      `http://localhost:3000/users/${user.id}/liked`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ movieId: movie.id }),
      }
    );
    console.log(response);
    if (!response.ok) throw new Error("Failed to toggle like");

    // Optionnel : récupérer l'action renvoyée par le backend
    const data = await response.json();

    // Mettre à jour le contexte local
    if (data.action === "added") addLikedMovie(movie);
    else removeLikedMovie(movie.id);
  } catch (err) {
    console.error(err);
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

      {isAuthenticated && (
        <div className="movie-actions">
          <button onClick={handleLikeClick}>
            <FaHeart className={isLiked ? "gold" : ""} />
          </button>
          <button onClick={handleWatchlistClick}>
            <FaEye className={isInWatchlist ? "gold" : ""} />
          </button>
        </div>
      )}
    </Link>
  );
}
