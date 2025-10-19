import React, { useState } from 'react';
import { ArrowLeft, Bookmark, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';

const TaskFormPage = () => {
  const { setCurrentView, addTask } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateEnabled: false,
    timeEnabled: true,
    time: '08:15',
    priority: 'High',
    reminderEnabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      title: formData.title || 'New Task',
      description: formData.description,
      icon: 'FileText',
      status: 'todo',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: formData.timeEnabled ? formData.time : '',
      priority: formData.priority.toLowerCase(),
    });
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-0">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <button 
            onClick={() => setCurrentView('home')}
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-600 md:text-base">Drafts</span>
          <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <Bookmark size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Create New Task</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 md:text-base">
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 md:text-base">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add more details about the task..."
              rows="3"
              className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none resize-none"
            />
          </div>

        {/* Date & Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Date & Time
          </label>
          
          {/* Date Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Date</span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, dateEnabled: !formData.dateEnabled })}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                formData.dateEnabled ? 'bg-gray-300' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                formData.dateEnabled ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>

          {/* Time Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Time</span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, timeEnabled: !formData.timeEnabled })}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                formData.timeEnabled ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 right-1 w-5 h-5 bg-white rounded-full transition-transform ${
                formData.timeEnabled ? '' : '-translate-x-5'
              }`} />
            </button>
          </div>

          {/* Time Display */}
          {formData.timeEnabled && (
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-red-500 mb-2">
                {formData.time} <span className="text-2xl">am</span>
              </div>
              <div className="flex justify-center gap-1">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 ${i === 3 || i === 4 ? 'h-8 bg-red-500' : 'h-4 bg-gray-300'} rounded-full`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors mb-6"
          >
            Save
          </button>
        </div>

        {/* Others */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Others
          </label>

          {/* Priority */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Priority</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <span>{formData.priority}</span>
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Reminder */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Reminder</span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, reminderEnabled: !formData.reminderEnabled })}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                formData.reminderEnabled ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 ${formData.reminderEnabled ? 'right-1' : 'left-1'} w-5 h-5 bg-white rounded-full transition-all`} />
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
