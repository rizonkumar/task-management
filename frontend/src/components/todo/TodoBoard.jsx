import React, { useState, useEffect } from 'react';
import TodoColumn from './TodoColumn';
import TodoForm from './TodoForm';
import Filter from './Filter';
import { todoService } from '../../services/todoService';

const TodoBoard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ search: '', date: null });

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
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const statuses = [
    { id: 'todo', label: '📝 Todo', color: 'bg-blue-50' },
    { id: 'in-progress', label: '⏳ In Progress', color: 'bg-yellow-50' },
    { id: 'completed', label: '✅ Completed', color: 'bg-green-50' },
  ];

  const handleAddTodo = async (todo) => {
    try {
      const newTodo = await todoService.createTodo({
        ...todo,
        status: 'todo',
        completed: false,
      });
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Failed to create task');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Failed to delete task');
    }
  };

  const handleUpdateTodoStatus = async (id, newStatus) => {
    try {
      const updated = await todoService.updateTodo(id, { status: newStatus });
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Failed to update task status');
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(filter.search.toLowerCase());
    const matchesDate = !filter.date || todo.dueDate === filter.date;
    return matchesSearch && matchesDate;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

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
