import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { todoService } from '../services/todoService';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (isMounted) {
        await loadTodos();
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      await todoService.toggleTodo(id);
      loadTodos();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const remainingTasks = totalTasks - completedTasks;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const nextFocusTasks = tasks.filter(t => !t.completed);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-purple-600 border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-indigo-600 border-l-blue-600 animate-spin-slow"></div>
        </div>
        <div className="text-center">
          <p className="text-gray-700 font-semibold text-lg animate-pulse">Loading your workspace</p>
          <p className="text-gray-500 text-sm mt-1">Getting everything ready...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-0">
      {/* Header - Mobile Only */}
      <div className="md:hidden flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
            {user?.avatar || user?.name?.[0] || 'U'}
          </div>
          <div>
            <p className="text-gray-900 font-bold text-lg">Hey {user?.name?.split(' ')[0] || 'there'}! 👋</p>
            <p className="text-sm text-gray-500 font-medium">Let's crush some goals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={() => navigate('/task-form')}
            className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Plus size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-600 mt-2 font-medium">Ready to make today productive?</p>
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-gray-100">
          <Bell size={22} className="text-gray-600" />
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Stats Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-bold text-gray-900">Your Progress</h2>
            </div>
            
            {/* Progress Circle */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                {/* Background circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-100"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {Math.round(progressPercentage)}%
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Complete</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">Completed</span>
                </div>
                <span className="text-lg font-bold text-green-600">{completedTasks}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Circle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Remaining</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{remainingTasks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tasks List */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Your Tasks</h3>
            <span className="text-sm text-gray-500 font-medium">{nextFocusTasks.length} active</span>
          </div>
          
          <div className="space-y-3">
            {nextFocusTasks.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-900 font-semibold text-lg mb-2">All caught up! 🎉</p>
                <p className="text-gray-500 text-sm">No pending tasks. Time to add new ones!</p>
                <button
                  onClick={() => navigate('/task-form')}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all"
                >
                  Create Task
                </button>
              </div>
            ) : (
              nextFocusTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTodo(task.id);
                      }}
                      className="flex-shrink-0 w-6 h-6 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center group-hover:border-blue-500"
                    >
                      {task.completed && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {task.priority && (
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </span>
                        )}
                        {task.category && (
                          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                            {task.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
