import React from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { TaskIcon } from '../../utils/iconMap';

const TaskListItem = ({ task, onClick }) => {
  // Striped pattern for tasks based on status
  const getStripePattern = () => {
    if (task.status === 'in-progress') return 'bg-gradient-to-r from-red-50 via-white to-red-50';
    return 'bg-white';
  };

  return (
    <div 
      onClick={onClick}
      className={`${getStripePattern()} rounded-2xl p-4 shadow-sm cursor-pointer active:scale-98 transition-transform relative overflow-hidden`}
    >
      {/* Striped left border for tasks */}
      {task.status !== 'completed' && (
        <div className="absolute left-0 top-0 bottom-0 w-1">
          <div className="h-full bg-gradient-to-b from-red-500 via-red-300 to-red-500 opacity-60"></div>
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <TaskIcon name={task.icon} size={20} className="text-red-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-base">{task.title}</h4>
            <p className="text-sm text-gray-500 mt-0.5">in {task.dueTime}</p>
          </div>
        </div>
        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <ChevronRight size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Meeting Link */}
      {task.meetingLink && (
        <div className="flex items-center gap-1.5 mb-2 ml-13">
          <div className="w-3.5 h-3.5 bg-green-100 rounded flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">{task.meetingLink}</span>
          <span className="text-xs text-gray-400">↗</span>
        </div>
      )}

      {/* Warning Badge */}
      {task.warning && (
        <div className="bg-red-50 rounded-xl p-2.5 flex items-center gap-2 ml-13">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
          <span className="text-xs text-red-600 font-medium">{task.warning}</span>
        </div>
      )}
    </div>
  );
};

export default TaskListItem;
