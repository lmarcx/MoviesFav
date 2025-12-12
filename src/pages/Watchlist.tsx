import React, { useContext } from 'react';
import { ListsContext } from '../contexts/ListsContext';
import MovieCard from '../components/MovieCard';
import './Watchlist.css';

const Watchlist: React.FC = () => {
  const { watchlist } = useContext(ListsContext);

  return (
    <div className="watchlist">
      <h2>Watchlist</h2>
      <div className="movie-list">
        {watchlist.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
