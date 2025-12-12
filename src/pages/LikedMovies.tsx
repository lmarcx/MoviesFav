import { useContext } from "react";
import { ListsContext } from "../contexts/ListsContext";
import MovieCard from "../components/MovieCard";
import "./LikedMovies.css";

function LikedMovies() {
  const { likedMovies } = useContext(ListsContext);

  return (
    <div className="liked-movies">
      <h2>Liked Movies</h2>
      <div className="movie-list">
        {likedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default LikedMovies;
