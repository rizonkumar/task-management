import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Play,
  Pause,
  AlertCircle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { todoService } from "../services/todoService";
import { TaskIcon } from "../utils/iconMap";

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadTask = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodo(id);
      setTask(data);
    } catch (error) {
      console.error('Failed to load task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this task?")) {
      try {
        await todoService.deleteTodo(id);
        navigate('/');
      } catch (error) {
        console.error('Failed to delete task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleMarkComplete = async () => {
    try {
      await todoService.updateTodo(id, { completed: true, status: 'completed' });
      navigate('/');
    } catch (error) {
      console.error('Failed to mark complete:', error);
      alert('Failed to mark task complete');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Task not found</p>
      </div>
    );
  }

  // const completedCount = selectedTask.checklist?.filter(item => item.completed).length || 0;
  // const totalCount = selectedTask.checklist?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(`/task-form?edit=${id}`)}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Edit2 size={18} className="text-gray-600" />
          </button>
          <button
            onClick={handleDelete}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto">
        {/* Timer Display */}
        <div className="text-center mb-6 md:mb-8">
          <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            {task.timer
              ? `${task.timer.hours}:${String(
                  task.timer.minutes
                ).padStart(2, "0")}`
              : "00:00"}
          </div>

          {/* Task Title */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <TaskIcon
                name={task.icon || 'FileText'}
                size={24}
                className="text-red-500"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              {task.title}
            </h1>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-600 mb-4">
              📋 {task.description}
            </p>
          )}

          {/* Time Slot */}
          {task.dueTime && (
            <p className="text-sm text-gray-500 mb-2">{task.dueTime}</p>
          )}

          {/* Meeting Link */}
          {task.meetingLink && (
            <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm mb-4">
              <div className="w-3 h-3 bg-green-100 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded"></div>
              </div>
              <span className="text-xs text-gray-700">
                {task.meetingLink}
              </span>
              <span className="text-xs text-gray-400">↗</span>
            </div>
          )}

          {/* Warning */}
          {task.warning && (
            <div className="bg-red-50 rounded-xl p-3 flex items-center gap-2 mb-6 max-w-xs mx-auto">
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-sm text-red-600">
                {task.warning}
              </span>
            </div>
          )}
        </div>

        {/* Start/Pause Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 bg-white hover:bg-gray-50 rounded-full py-3 md:py-4 flex items-center justify-center gap-2 shadow-sm transition-colors">
            <Play size={18} className="text-gray-700" />
            <span className="font-semibold text-gray-700">Start</span>
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 rounded-full py-3 md:py-4 flex items-center justify-center gap-2 shadow-sm transition-colors">
            <Pause size={18} className="text-gray-700" />
            <span className="font-semibold text-gray-700">Pause</span>
          </button>
        </div>

        {/* Checklist */}
        {task.checklist && task.checklist.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3 md:text-base">
              Checklist
            </h3>
            <div className="space-y-3">
              {task.checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      item.completed
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {item.completed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      item.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mark Complete Button */}
        <button
          onClick={handleMarkComplete}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl shadow-lg transition-colors"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPage;
