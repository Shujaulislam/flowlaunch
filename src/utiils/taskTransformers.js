// Utility functions for transforming task data

// Transform API todo to our application's task format
export const transformApiTask = (apiTask) => ({
    id: apiTask.id,
    title: apiTask.title,
    description: '', // JSONPlaceholder doesn't provide description
    status: null, // Force manual status selection
    originalData: apiTask // Keep original data for reference
  });
  
  // Validate task before adding
  export const validateTask = (task) => {
    const errors = {};
  
    // Title validation
    if (!task.title || task.title.trim() === '') {
      errors.title = 'Title is required';
    }
  
    // Status validation
    const validStatuses = ['To Do', 'In Progress', 'Done'];
    if (!task.status || !validStatuses.includes(task.status)) {
      errors.status = 'Valid status is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Generate unique ID for new tasks
  export const generateTaskId = (existingTasks) => {
    if (!existingTasks || existingTasks.length === 0) return 1;
    const maxId = Math.max(...existingTasks.map(task => task.id));
    return maxId + 1;
  };

  // Map API completed status to our status format
  export const mapApiStatus = (completed) => {
    return completed ? 'Done' : 'To Do';
  };

  // Transform task for API submission
  export const prepareTaskForApi = (task) => ({
    id: task.id,
    title: task.title,
    completed: task.status === 'Done'
  });