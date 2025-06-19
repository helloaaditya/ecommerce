// Add axios defaults for base URL
import axios from 'axios';

// API Configuration for different environments
const getApiBaseUrl = () => {
  // Use VITE_API_URL if set, otherwise fallback to the Render backend URL
  return import.meta.env.VITE_API_URL || 'https://ecommerce-sshz.onrender.com/api';
};

// Configure axios defaults
export const API_BASE_URL = getApiBaseUrl();
axios.defaults.baseURL = API_BASE_URL;

// Log the API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('🌐 API Base URL:', API_BASE_URL);
}


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