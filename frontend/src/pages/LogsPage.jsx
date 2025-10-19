import React, { useState } from 'react';
import { ArrowLeft, Plus, Clock, Search, Calendar as CalendarIcon, Trash2, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';

const LogsPage = () => {
  const { logs, addLog, deleteLog, setCurrentView } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLog, setNewLog] = useState('');
  const [selectedDate, setSelectedDate] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', color: 'gray', icon: '📋' },
    { id: 'work', label: 'Work', color: 'blue', icon: '💼' },
    { id: 'personal', label: 'Personal', color: 'green', icon: '🏠' },
    { id: 'health', label: 'Health', color: 'red', icon: '❤️' },
    { id: 'learning', label: 'Learning', color: 'purple', icon: '📚' },
  ];

  const handleAddLog = (category = 'work') => {
    if (newLog.trim()) {
      addLog(newLog, category);
      setNewLog('');
      setShowAddForm(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const groupLogsByDate = (logs) => {
    const grouped = {};
    logs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString('en-US');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(log);
    });
    return grouped;
  };

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedLogs = groupLogsByDate(filteredLogs);
  const dates = Object.keys(groupedLogs).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="md:hidden">
          <button 
            onClick={() => setCurrentView('home')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredLogs.length} total logs</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="w-10 h-10 md:w-12 md:h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-sm transition-colors"
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-3 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Add Log Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <textarea
            value={newLog}
            onChange={(e) => setNewLog(e.target.value)}
            placeholder="What did you accomplish?"
            className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-red-500 resize-none"
            rows="3"
            autoFocus
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddLog}
              className="flex-1 bg-red-500 text-white font-medium py-2 rounded-xl"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewLog('');
              }}
              className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Logs Timeline - Grouped by Date */}
      <div className="space-y-6">
        {dates.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <CalendarIcon size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No logs found</p>
            <p className="text-gray-400 text-sm mt-2">Start tracking your progress by adding a log!</p>
          </div>
        ) : (
          dates.map((date) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <CalendarIcon size={16} />
                  <span>{date}</span>
                </div>
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500">{groupedLogs[date].length} logs</span>
              </div>

              {/* Logs for this date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {groupedLogs[date].map((log) => (
                  <div key={log.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock size={20} className="text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 leading-relaxed">{log.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{formatTime(log.timestamp)}</span>
                          {log.category && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {categories.find(c => c.id === log.category)?.icon} {log.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this log?')) {
                            deleteLog(log.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogsPage;
