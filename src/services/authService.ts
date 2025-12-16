import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/api/auth'; // Using relative URL, assuming proxy is set up in vite.config.ts

const register = (username: string, password: string) => {
  return axios.post(`${API_URL}/register`, {
    username,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<{ id: number; role: number }>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

const getToken = () => {
  return localStorage.getItem('token');
}

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
};

export default authService;

