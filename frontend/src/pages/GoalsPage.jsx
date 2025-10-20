import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Target,
  Clock,
  TrendingUp,
  Edit2,
  Trash2,
  X,
  AlertCircle,
} from "lucide-react";
import { goalService } from "../services/goalService";

const GoalsPage = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    period: "weekly",
    target: 100,
    current: 0,
    category: "personal",
  });

  useEffect(() => {
    loadGoals();
  }, [selectedPeriod]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadGoals = async () => {
    try {
      const params = selectedPeriod !== "all" ? { period: selectedPeriod } : {};
      const data = await goalService.getGoals(params);
      setGoals(data);
    } catch (error) {
      console.error("Failed to load goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const periods = [
    { id: "all", label: "All Goals" },
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
    { id: "custom", label: "Custom" },
  ];

  const categories = [
    { id: "personal", label: "Personal", color: "blue" },
    { id: "health", label: "Health", color: "red" },
    { id: "career", label: "Career", color: "purple" },
    { id: "learning", label: "Learning", color: "green" },
    { id: "finance", label: "Finance", color: "yellow" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      if (editingGoal) {
        await goalService.updateGoal(editingGoal.id, formData);
        setEditingGoal(null);
      } else {
        await goalService.createGoal(formData);
      }
      resetForm();
      setShowAddModal(false);
      loadGoals();
    } catch (error) {
      console.error("Failed to save goal:", error);
      alert("Failed to save goal");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      period: "weekly",
      target: 100,
      current: 0,
      category: "personal",
    });
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description || "",
      period: goal.period,
      target: goal.target,
      current: goal.current,
      category: goal.category || "personal",
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this goal?")) {
      try {
        await goalService.deleteGoal(id);
        loadGoals();
      } catch (error) {
        console.error("Failed to delete goal:", error);
        alert("Failed to delete goal");
      }
    }
  };

  const handleProgressUpdate = async (goalId, newCurrent) => {
    try {
      await goalService.updateProgress(goalId, newCurrent);
      loadGoals();
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const getProgress = (goal) => {
    if (!goal.target || goal.target === 0) return 0;
    return Math.min(100, Math.round((goal.current / goal.target) * 100));
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
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

      {/* Stats */}
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
            {goals.filter((g) => g.completed).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-orange-500" size={20} />
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {goals.filter((g) => !g.completed && g.current > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <span className="text-sm text-gray-600">Not Started</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {goals.filter((g) => g.current === 0).length}
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
        {goals.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl p-12 text-center">
            <Target size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No goals yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Create your first goal to get started!
            </p>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = getProgress(goal);
            return (
              <div
                key={goal.id}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {goal.title}
                    </h3>
                    {goal.description && (
                      <p className="text-sm text-gray-600">
                        {goal.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {goal.period}
                      </span>
                      {goal.category && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          {goal.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(
                        progress
                      )} transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {progress}% complete
                  </p>
                </div>

                {/* Update Progress */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max={goal.target}
                    defaultValue={goal.current}
                    onBlur={(e) => {
                      const newValue = parseInt(e.target.value) || 0;
                      if (newValue !== goal.current) {
                        handleProgressUpdate(goal.id, newValue);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={() =>
                      handleProgressUpdate(goal.id, goal.current + 1)
                    }
                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    +1
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Period
                  </label>
                  <select
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({ ...formData, period: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  >
                    {periods
                      .filter((p) => p.id !== "all")
                      .map((period) => (
                        <option key={period.id} value={period.id}>
                          {period.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target
                  </label>
                  <input
                    type="number"
                    value={formData.target}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        target: parseInt(e.target.value) || 0,
                      })
                    }
                    min="1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current
                  </label>
                  <input
                    type="number"
                    value={formData.current}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        current: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
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
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
