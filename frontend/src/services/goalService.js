import api from "../lib/api";

export const goalService = {
  getGoals: async (params) => {
    const response = await api.get("/goals", { params });
    return response.data;
  },

  getGoal: async (id) => {
    const response = await api.get(`/goals/${id}`);
    return response.data;
  },

  createGoal: async (data) => {
    const response = await api.post("/goals", data);
    return response.data;
  },

  updateGoal: async (id, data) => {
    const response = await api.put(`/goals/${id}`, data);
    return response.data;
  },

  deleteGoal: async (id) => {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  },

  updateProgress: async (id, current) => {
    const response = await api.patch(`/goals/${id}/progress`, { current });
    return response.data;
  },
};
