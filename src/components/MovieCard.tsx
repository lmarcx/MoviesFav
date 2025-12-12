import React from 'react';
import type Movie from '../services/api';
import './MovieCard.css';
import { FaHeart, FaEye } from 'react-icons/fa';

interface MovieCardProps {
  movie: Movie;
  onLike: (movie: Movie) => void;
  onAddToWatchlist: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onLike, onAddToWatchlist }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span>{movie.vote_average}</span>
      </div>
      <div className="movie-actions">
        <button onClick={() => onLike(movie)}>
          <FaHeart />
        </button>
        <button onClick={() => onAddToWatchlist(movie)}>
          <FaEye />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
