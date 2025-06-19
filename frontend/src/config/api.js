// Add axios defaults for base URL
import axios from 'axios';

// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in production (Vercel)
  if (import.meta.env.PROD) {
    // Use deployed backend domain in production
    return 'https://ecommerce-bootcamp-tug5.vercel.app/api';
  }
  // Development - use localhost
  return 'http://localhost:5000/api';
};

// Configure axios defaults
export const API_BASE_URL = getApiBaseUrl();
axios.defaults.baseURL = API_BASE_URL;

// Log the API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('🌐 API Base URL:', API_BASE_URL);
}

// Add axios interceptors for better error handling

// Request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API_BASE_URL; 