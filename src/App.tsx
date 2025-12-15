import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import LikedMovies from "./pages/LikedMovies";
import Watchlist from "./pages/Watchlist";
import MoviePage from "./pages/MoviePage";
import { ListsProvider } from "./contexts/ListsContext";
import "./App.css";

export default function App() {
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
              <Route path="/movie/:id" element={<MoviePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ListsProvider>
  );
}
