import React, { createContext, useState, type ReactNode } from 'react';
import type Movie from '../services/api';

interface ListsContextData {
  likedMovies: Movie[];
  watchlist: Movie[];
  addLikedMovie: (movie: Movie) => void;
  removeLikedMovie: (movieId: number) => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
}

export const ListsContext = createContext<ListsContextData>({} as ListsContextData);

interface ListsProviderProps {
  children: ReactNode;
}

export const ListsProvider: React.FC<ListsProviderProps> = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const addLikedMovie = (movie: Movie) => {
    setLikedMovies(prev => [...prev, movie]);
  };

  const removeLikedMovie = (movieId: number) => {
    setLikedMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => [...prev, movie]);
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  return (
    <ListsContext.Provider
      value={{
        likedMovies,
        watchlist,
        addLikedMovie,
        removeLikedMovie,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};
