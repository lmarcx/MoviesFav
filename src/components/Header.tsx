import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const userId = isAuthenticated ? useAuth().user?.id : null;

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MovieApp</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to={`/${userId}/liked`}>Liked Movies</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </>
          )}
          {isAuthenticated ? (
            <li>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

