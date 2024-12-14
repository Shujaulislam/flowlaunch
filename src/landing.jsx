import React, { useState } from 'react'
import TaskTable from './components/TaskTable'
import TaskForm from './components/TaskForm'
import TaskFilters from './components/TaskFilters'
import Toast from './components/Toast'
import { useTaskContext } from './context/TaskContext';



function Landing() {
  const { tasks, isLoading, error, toast, clearToast } = useTaskContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

    if (isLoading) {
      return (
        <div className="task-container flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="task-container flex items-center justify-center min-h-screen">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Tasks</h3>
                <p className="mt-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </div>
      
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <TaskForm />
      
      <TaskTable
        tasks={tasks}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />
      
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}
    </div>
  )
}

export default Landing