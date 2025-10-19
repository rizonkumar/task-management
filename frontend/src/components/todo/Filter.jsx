import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, date: date || null });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    onFilterChange({ search, date: value || null });
  };

  const handleClearFilters = () => {
    setSearch('');
    setDate('');
    onFilterChange({ search: '', date: null });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔍 Search tasks
          </label>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📅 Filter by date
          </label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          />
        </div>

        {(search || date) && (
          <button
            onClick={handleClearFilters}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
