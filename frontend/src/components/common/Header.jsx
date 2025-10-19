import React from 'react';

const Header = ({ currentPage, onPageChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          </div>
          
          <nav className="flex space-x-8">
            <button
              onClick={() => onPageChange('todos')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'todos'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📋 Tasks
            </button>
            <button
              onClick={() => onPageChange('logs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'logs'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📝 Logs
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              🔔
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              ⚙️
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
