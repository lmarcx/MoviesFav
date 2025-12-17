import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import LikedMovies from "./pages/LikedMovies";
import Watchlist from "./pages/Watchlist";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import { ListsProvider } from "./contexts/ListsContext";
import "./App.css";

export default function App() {
  return (
    <ListsProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/:userId/liked" element={<PrivateRoute />}>
              <Route index element={<LikedMovies />} />
            </Route>
            <Route path="/watchlist" element={<PrivateRoute />}>
              <Route index element={<Watchlist />} />
            </Route>
          </Routes>
        </main>
      </div>
    </ListsProvider>
  );
}
