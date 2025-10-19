import React from 'react';
import TodoCard from './TodoCard';

const TodoColumn = ({ status, todos, onDeleteTodo, onUpdateStatus }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const todoId = parseInt(e.dataTransfer.getData('todoId'));
    if (!isNaN(todoId)) {
      onUpdateStatus(todoId, status.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${status.color} rounded-lg p-6 min-h-96 border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {status.label}
        </h3>
        <span className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
          {todos.length}
        </span>
      </div>

      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No tasks yet</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={() => onDeleteTodo(todo.id)}
              onStatusChange={onUpdateStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoColumn;
