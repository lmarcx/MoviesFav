import React, { useContext } from 'react';
import { ListsContext } from '../contexts/ListsContext';
import MovieCard from '../components/MovieCard';
import './Watchlist.css';

const Watchlist: React.FC = () => {
  const { watchlist, removeLikedMovie, removeFromWatchlist } = useContext(ListsContext);

  return (
    <div className="watchlist">
      <h2>Watchlist</h2>
      <div className="movie-list">
        {watchlist.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onLike={() => removeLikedMovie(movie.id)}
            onAddToWatchlist={() => removeFromWatchlist(movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
