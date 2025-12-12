import React, { useEffect, useState, useContext } from 'react';
import { getPopularMovies } from '../services/api';
import type Movie from '../services/api';
import MovieCard from './MovieCard';
import { ListsContext } from '../contexts/ListsContext';
import './MovieList.css';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { addLikedMovie, addToWatchlist } = useContext(ListsContext);

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onLike={addLikedMovie}
          onAddToWatchlist={addToWatchlist}
        />
      ))}
    </div>
  );
};

export default MovieList;
