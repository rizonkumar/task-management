import api from '../lib/api';

export const logService = {
  getLogs: async (params) => {
    const response = await api.get('/logs', { params });
    return response.data;
  },

  getLog: async (id) => {
    const response = await api.get(`/logs/${id}`);
    return response.data;
  },

  createLog: async (data) => {
    const response = await api.post('/logs', data);
    return response.data;
  },

  updateLog: async (id, data) => {
    const response = await api.put(`/logs/${id}`, data);
    return response.data;
  },

  deleteLog: async (id) => {
    const response = await api.delete(`/logs/${id}`);
    return response.data;
  },

  // Aliases for backward compatibility
  getAll: async (params) => {
    const response = await api.get('/logs', { params });
    return response.data;
  },

  getByDate: async (date) => {
    const response = await api.get('/logs', { params: { date } });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/logs', data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/logs/${id}`);
    return response.data;
  },
};
