import React from 'react';
import { Bell, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import TaskListItem from '../components/todo/TaskListItem';
import { TaskIcon } from '../utils/iconMap';

const HomePage = () => {
  const { user, tasks, setCurrentView, setSelectedTask } = useStore();

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const remainingTasks = totalTasks - completedTasks;

  const nextFocusTasks = tasks.filter(t => t.status === 'todo' || t.status === 'in-progress');

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setCurrentView('task-detail');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-0">
      {/* Header - Mobile Only */}
      <div className="md:hidden flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.avatar}
          </div>
          <div>
            <p className="text-gray-900 font-semibold">Good Morning {user.name}!</p>
            <p className="text-sm text-gray-500">Let's get it done 💪</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={() => setCurrentView('task-form')}
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-sm"
          >
            <Plus size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good Morning {user.name}!</h1>
          <p className="text-gray-600 mt-1">Let's get it done 💪</p>
        </div>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Bell size={22} className="text-gray-600" />
        </button>
      </div>

      {/* Date Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 md:hidden">
        <div className="flex-shrink-0 w-14 h-16 bg-white rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs text-gray-400">Oct</span>
          <span className="text-base text-gray-400">16</span>
        </div>
        <div className="flex-shrink-0 w-14 h-16 bg-red-500 rounded-lg flex flex-col items-center justify-center shadow-md">
          <span className="text-xs text-white font-medium">Oct</span>
          <span className="text-base text-white font-bold">17</span>
        </div>
        <div className="flex-shrink-0 w-14 h-16 bg-white rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs text-gray-400">Oct</span>
          <span className="text-base text-gray-400">18</span>
        </div>
      </div>

      {/* Main Grid Layout - Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Stats */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-3">You've completed</h2>
            <div className="flex flex-wrap items-baseline gap-1 mb-4">
              <span className="text-2xl font-bold text-gray-900">{completedTasks}</span>
              <span className="text-xl font-semibold text-gray-500">of</span>
              <span className="text-2xl font-bold text-gray-900">{totalTasks}</span>
              <span className="text-xl font-semibold text-gray-500">tasks</span>
              <div className="w-8 h-8 rounded-full border-4 border-green-500 ml-2 flex-shrink-0"></div>
              <span className="text-2xl font-bold text-red-500 ml-1">{remainingTasks}</span>
              <span className="text-xl font-semibold text-gray-500">to go</span>
            </div>
            
            {/* Recent Tasks */}
            <div className="space-y-2.5">
              {tasks.slice(0, 2).map((task) => (
                <div key={task.id} className="flex items-center gap-2.5 text-sm">
                  <div className="w-5 h-5 bg-red-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <TaskIcon name={task.icon} size={12} className="text-red-500" />
                  </div>
                  <span className="text-gray-700 font-medium">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Next Focus Tasks */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-500 mb-3 md:text-base">Next Focus</h3>
          <div className="space-y-3">
            {nextFocusTasks.map((task) => (
              <TaskListItem 
                key={task.id} 
                task={task} 
                onClick={() => handleTaskClick(task)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
