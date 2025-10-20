import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track requests in development to help debug duplicate calls
if (import.meta.env.DEV) {
  const requestLog = new Map();
  
  api.interceptors.request.use(
    (config) => {
      const key = `${config.method} ${config.url}`;
      const now = Date.now();
      const lastRequest = requestLog.get(key);
      
      if (lastRequest && now - lastRequest < 1000) {
        console.warn(`⚠️ Duplicate request detected within 1s: ${key}`);
      }
      
      requestLog.set(key, now);
      return config;
    },
    (error) => Promise.reject(error)
  );
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 403 and haven't retried yet, try to refresh token
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
