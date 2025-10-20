const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// TODO endpoints
export const todoAPI = {
  getAll: () => apiCall('/todos'),
  getById: (id) => apiCall(`/todos/${id}`),
  create: (data) => apiCall('/todos', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/todos/${id}`, { method: 'DELETE' }),
};

// Log endpoints
export const logAPI = {
  getAll: () => apiCall('/logs'),
  getByDate: (date) => apiCall(`/logs?date=${date}`),
  create: (data) => apiCall('/logs', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/logs/${id}`, { method: 'DELETE' }),
};

// Auth endpoints
export const authAPI = {
  login: (email, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  signup: (email, password) =>
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => apiCall('/auth/logout', { method: 'POST' }),
};
