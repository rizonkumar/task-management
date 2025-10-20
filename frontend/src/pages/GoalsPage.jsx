import React, { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Target,
  Calendar,
  Clock,
  TrendingUp,
  Edit2,
  Trash2,
  X,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../store/useStore";

const GoalsPage = () => {
  const { goals, addGoal, updateGoal, deleteGoal, setCurrentView } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "🎯",
    period: "daily",
    reminderFrequency: "daily",
    targetDate: "",
    progress: 0,
    category: "personal",
  });

  const periods = [
    { id: "all", label: "All Goals" },
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  const categories = [
    { id: "personal", label: "Personal", color: "blue", icon: "🏠" },
    { id: "health", label: "Health", color: "red", icon: "❤️" },
    { id: "career", label: "Career", color: "purple", icon: "💼" },
    { id: "learning", label: "Learning", color: "green", icon: "📚" },
    { id: "finance", label: "Finance", color: "yellow", icon: "💰" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingGoal) {
      updateGoal(editingGoal.id, formData);
      setEditingGoal(null);
    } else {
      addGoal(formData);
    }

    resetForm();
    setShowAddModal(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "🎯",
      period: "daily",
      reminderFrequency: "daily",
      targetDate: "",
      progress: 0,
      category: "personal",
    });
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      icon: goal.icon,
      period: goal.period,
      reminderFrequency: goal.reminderFrequency,
      targetDate: goal.targetDate,
      progress: goal.progress,
      category: goal.category,
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this goal?")) {
      deleteGoal(id);
    }
  };

  const filteredGoals =
    selectedPeriod === "all"
      ? goals
      : goals.filter((g) => g.period === selectedPeriod);

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView("home")}
            className="md:hidden w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Goals & Challenges
            </h1>
            <p className="text-sm text-gray-600">
              Track your journey to success
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingGoal(null);
            setShowAddModal(true);
          }}
          className="w-10 h-10 md:w-12 md:h-12 bg-red-500 hover:bg-red-600 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all"
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-blue-500" size={20} />
            <span className="text-sm text-gray-600">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-500" size={20} />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {goals.filter((g) => g.progress === 100).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-orange-500" size={20} />
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {goals.filter((g) => g.progress > 0 && g.progress < 100).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-sm text-gray-600">Not Started</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {goals.filter((g) => g.progress === 0).length}
          </p>
        </div>
      </div>

      {/* Period Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedPeriod === period.id
                ? "bg-red-500 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl p-12 text-center">
            <Target size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No goals yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Create your first goal to get started!
            </p>
          </div>
        ) : (
          filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      goal.progress === 100 ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{goal.title}</h3>
                    <span className="text-xs text-gray-500 capitalize">
                      {goal.period}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Description */}
              {goal.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {goal.description}
                </p>
              )}

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-bold text-gray-900">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(
                      goal.progress
                    )} transition-all`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{goal.reminderFrequency}</span>
                </div>
                {goal.targetDate && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>
                      {new Date(goal.targetDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Update Progress */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) =>
                    updateGoal(goal.id, { progress: parseInt(e.target.value) })
                  }
                  className="w-full accent-red-500"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingGoal ? "Edit Goal" : "New Goal"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingGoal(null);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Icon Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {["🎯", "❤️", "💪", "📚", "💼", "💰", "🏃", "🎨"].map(
                      (icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`w-12 h-12 rounded-xl text-2xl transition-colors ${
                            formData.icon === icon
                              ? "bg-red-100 ring-2 ring-red-500"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {icon}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Drink 5 cups of water"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your goal..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none"
                  />
                </div>

                {/* Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Period
                  </label>
                  <select
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({ ...formData, period: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                {/* Reminder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder
                  </label>
                  <select
                    value={formData.reminderFrequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reminderFrequency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    <option value="daily">Every Day</option>
                    <option value="weekly">Every Week</option>
                    <option value="monthly">Every Month</option>
                  </select>
                </div>

                {/* Target Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) =>
                      setFormData({ ...formData, targetDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, category: cat.id })
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-colors ${
                          formData.category === cat.id
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    {editingGoal ? "Update Goal" : "Create Goal"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingGoal(null);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
