import api from '../lib/api';

export const todoService = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  getTodo: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (data) => {
    const response = await api.post('/todos', data);
    return response.data;
  },

  updateTodo: async (id, data) => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },
};
