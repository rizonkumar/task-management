import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useStore = create((set, get) => ({
  currentView: "home",
  selectedTask: null,

  user: {
    name: "Rizon Kumar Rahi",
    avatar: "RKR",
  },

  tasks: [
    {
      id: 1,
      title: "4km jog",
      icon: "Activity",
      status: "todo",
      dueDate: "2025-10-17",
      dueTime: "1 hour",
      priority: "medium",
    },
    {
      id: 2,
      title: "Team Handoff Prep",
      icon: "Users",
      status: "todo",
      dueDate: "2025-10-17",
      dueTime: "in 25 mins",
      priority: "high",
    },
    {
      id: 3,
      title: "Design Sprint Checkpoint",
      icon: "Laptop",
      description: "Revamp Dashboard Cards",
      status: "in-progress",
      dueDate: "2025-10-17",
      dueTime: "4 PM - 4:30 PM",
      meetingLink: "Google Meet",
      warning: "Finalize design handoff",
      timer: { hours: 24, minutes: 58 },
      checklist: [
        { id: 1, text: "Review layout updates", completed: false },
        { id: 2, text: "Annotate visual hierarchy", completed: false },
        { id: 3, text: "Export before/after screens", completed: false },
        { id: 4, text: "Send feedback summary", completed: false },
      ],
      priority: "high",
    },
  ],

  logs: [
    { id: 1, content: "Completed morning standup meeting", timestamp: new Date().toISOString(), category: "work" },
    { id: 2, content: "Finished 5km morning run", timestamp: new Date(Date.now() - 3600000).toISOString(), category: "health" },
    { id: 3, content: "Read 2 chapters of React documentation", timestamp: new Date(Date.now() - 7200000).toISOString(), category: "learning" },
  ],

  setCurrentView: (view) => set({ currentView: view }),

  setSelectedTask: (task) => set({ selectedTask: task }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Date.now() }],
    })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  toggleChecklistItem: (taskId, itemId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              checklist: task.checklist.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : task
      ),
    })),

  markTaskComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: "completed" } : t
      ),
    })),

  addLog: (content, category = 'work') =>
    set((state) => ({
      logs: [
        { id: Date.now(), content, timestamp: new Date().toISOString(), category },
        ...state.logs,
      ],
    })),

  deleteLog: (id) =>
    set((state) => ({
      logs: state.logs.filter((l) => l.id !== id),
    })),

  fetchTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      set({ tasks: response.data });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  },

  fetchLogs: async () => {
    try {
      const response = await axios.get(`${API_URL}/logs`);
      set({ logs: response.data });
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  },
}));
