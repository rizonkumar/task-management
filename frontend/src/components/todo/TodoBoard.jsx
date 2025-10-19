import React, { useState } from 'react';
import TodoColumn from './TodoColumn';
import TodoForm from './TodoForm';
import Filter from './Filter';

const TodoBoard = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Design Sprint Checkpoint', description: 'Revamp Dashboard Cards', status: 'in-progress', dueDate: '2025-10-17' },
    { id: 2, title: '4km jog', description: '', status: 'completed', dueDate: '2025-10-19' },
    { id: 3, title: 'Team Handoff Prep', description: '', status: 'todo', dueDate: '2025-10-20' },
  ]);
  
  const [filter, setFilter] = useState({ search: '', date: null });

  const statuses = [
    { id: 'todo', label: '📝 Todo', color: 'bg-blue-50' },
    { id: 'in-progress', label: '⏳ In Progress', color: 'bg-yellow-50' },
    { id: 'completed', label: '✅ Completed', color: 'bg-green-50' },
  ];

  const handleAddTodo = (todo) => {
    const newTodo = {
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      ...todo,
      status: 'todo',
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleUpdateTodoStatus = (id, newStatus) => {
    setTodos(todos.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(filter.search.toLowerCase());
    const matchesDate = !filter.date || todo.dueDate === filter.date;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Tasks</h2>
          <p className="text-gray-600 mt-1">You've completed <span className="font-semibold">{filteredTodos.filter(t => t.status === 'completed').length}</span> of <span className="font-semibold">{filteredTodos.length}</span> tasks</p>
        </div>
      </div>

      <Filter onFilterChange={setFilter} />
      
      <TodoForm onAddTodo={handleAddTodo} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map(status => (
          <TodoColumn
            key={status.id}
            status={status}
            todos={filteredTodos.filter(t => t.status === status.id)}
            onDeleteTodo={handleDeleteTodo}
            onUpdateStatus={handleUpdateTodoStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoBoard;
