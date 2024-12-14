import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/apiService';

const TaskContext = createContext();

// Status mapping constants
const STATUS_MAPPING = {
  true: 'Done'|| 'In Progress',
  false: 'To Do'
};

const transformApiTask = (apiTask) => ({
  id: apiTask.id,
  userId: apiTask.userId, 
  title: apiTask.title,
  description: '', // API doesn't provide description
  status: STATUS_MAPPING[apiTask.completed] || 'To Do',
  completed: apiTask.completed 
});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const apiTasks = await apiService.fetchTodos();
        const transformedTasks = apiTasks.slice(0, 20).map(transformApiTask);
        
        setTasks(prevTasks => {
          // Only set API tasks if no local tasks exist
          if (prevTasks.length === 0) {
            localStorage.setItem('tasks', JSON.stringify(transformedTasks));
            return transformedTasks;
          }
          return prevTasks;
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setToast({ message: err.message, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = async (newTask) => {
    try {
      // Ensure new task has the correct status format
      const taskWithValidStatus = {
        ...newTask,
        status: ['To Do', 'In Progress', 'Done'].includes(newTask.status) 
          ? newTask.status 
          : 'To Do',
        completed: newTask.status === 'Done' // Keep completed in sync with status
      };

      setTasks(prevTasks => [...prevTasks, taskWithValidStatus]);
      showToast('Task added successfully');
      return taskWithValidStatus;
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
      throw new Error('Failed to add task');
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      // Validate and normalize status
      if (!['To Do', 'In Progress', 'Done'].includes(updatedTask.status)) {
        updatedTask.status = 'To Do';
      }
      
      // Keep completed property in sync with status
      updatedTask.completed = updatedTask.status === 'Done';

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      showToast('Task updated successfully');
      return updatedTask;
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
      throw new Error('Failed to update task');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      showToast('Task deleted successfully');
      return true;
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
      throw new Error('Failed to delete task');
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      isLoading,
      error,
      addTask,
      updateTask,
      deleteTask,
      toast,
      clearToast
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export default TaskProvider;