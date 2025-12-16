import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import
import authService from '../services/authService';

interface AuthContextType {
  token: string | null;
  user: { id: number; role: number } | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(authService.getToken());
  const [user, setUser] = useState<{ id: number; role: number } | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ id: number; role: number }>(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        setToken(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    // The token is already set in localStorage by the login service
  };

  const logout = () => {
    setToken(null);
    authService.logout();
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
