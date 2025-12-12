import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import LikedMovies from './pages/LikedMovies';
import Watchlist from './pages/Watchlist';
import { ListsProvider } from './contexts/ListsContext';
import './App.css';

const App: React.FC = () => {
  return (
    <ListsProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/liked" element={<LikedMovies />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ListsProvider>
  );
};

export default App;

