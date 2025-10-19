import React from 'react';

const TodoCard = ({ todo, onDelete, onStatusChange }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('todoId', todo.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move border-l-4 border-red-500"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
            {todo.title}
          </h4>
          {todo.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {todo.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">
              📅 {new Date(todo.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
        
        <button
          onClick={onDelete}
          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
