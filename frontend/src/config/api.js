// API Configuration for different environments
const getApiBaseUrl = () => {
  // Check if we're in production (Vercel)
  if (import.meta.env.PROD) {
    // Use relative URL since both frontend and backend are on same domain
    return '/api';
  }
  
  // Development - use localhost
  return 'http://localhost:5000/api';
};

// Configure axios defaults
export const API_BASE_URL = getApiBaseUrl();

// Log the API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('🌐 API Base URL:', API_BASE_URL);
}

export default API_BASE_URL; 