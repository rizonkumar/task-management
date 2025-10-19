import React, { useState } from 'react';
import { ArrowLeft, Plus, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';

const LogsPage = () => {
  const { logs, addLog, deleteLog, setCurrentView } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLog, setNewLog] = useState('');

  const handleAddLog = () => {
    if (newLog.trim()) {
      addLog(newLog);
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Activity Logs</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="w-10 h-10 md:w-12 md:h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-sm transition-colors"
        >
          <Plus size={20} className="text-white" />
        </button>
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

      {/* Logs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {logs.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-500">No logs yet. Start tracking your progress!</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{log.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatTime(log.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogsPage;
