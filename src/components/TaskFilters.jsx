import React from 'react';
import { useTaskContext } from '../context/TaskContext';

function TaskFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
  const { tasks } = useTaskContext();

  // Calculate task counts
  const taskCounts = {
    total: tasks.length,
    'To Do': tasks.filter(task => task.status === 'To Do').length,
    'In Progress': tasks.filter(task => task.status === 'In Progress').length,
    'Done': tasks.filter(task => task.status === 'Done').length
  };

  return (
    <div className="w-full max-w-4xl mb-6 space-y-4">
      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {/* Task Counters */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">Total:</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full dark:bg-gray-700">
            {taskCounts.total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">To Do:</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {taskCounts['To Do']}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">In Progress:</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
            {taskCounts['In Progress']}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Done:</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
            {taskCounts['Done']}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
