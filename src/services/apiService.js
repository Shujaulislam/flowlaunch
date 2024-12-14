import axios from 'axios';

// Base URL for JSONPlaceholder API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// API Service with comprehensive error handling and transformation
const apiService = {
  // Fetch todos with robust error handling
  async fetchTodos() {
    try {
      const response = await axios.get(`${BASE_URL}/todos`, {
        params: {
          _limit: 20 // Limit to 20 tasks as per requirements
        }
      });

      // Transform and return specific fields
      return response.data.map(todo => ({
        id: todo.id,
        userId: todo.userId,
        title: todo.title,
        completed: todo.completed,
        description: '', // Adding empty description as API doesn't provide it
        status: todo.completed ? 'Done' : 'To Do' // Default mapping
      }));
    } catch (error) {
      console.error('API Fetch Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw new Error('Failed to fetch tasks. Please try again later.');
    }
  },

  // Add new task
  async addTask(taskData) {
    try {
      const response = await axios.post(`${BASE_URL}/todos`, {
        userId: 1, // Default userId
        title: taskData.title,
        completed: taskData.status === 'Done',
        description: taskData.description || ''
      });

      // Return structured data
      return {
        id: response.data.id || Date.now(), // Fallback for mock API
        userId: response.data.userId || 1,
        title: taskData.title,
        description: taskData.description || '',
        status: taskData.status,
        completed: taskData.status === 'Done'
      };
    } catch (error) {
      console.error('Add Task Error:', error);
      throw new Error('Failed to add task');
    }
  },

  // Update existing task
  async updateTask(taskId, taskData) {
    const response = await axios.patch(`${BASE_URL}/todos/${taskId}`, {
      title: taskData.title,
      completed: taskData.status === 'Done',
      description: taskData.description || ''
    });
    return response;
  },

  // Delete task
  async deleteTask(taskId) {
    try {
      await axios.delete(`${BASE_URL}/todos/${taskId}`);
      return {
        success: true,
        id: taskId,
        message: 'Task deleted successfully'
      };
    } catch (error) {
      console.error('Delete Task Error:', error);
      throw new Error('Failed to delete task');
    }
  }
};

export default apiService;