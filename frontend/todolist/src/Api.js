import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchToDoList = async () => {
  try {
    const response = await axios.get(`${API_URL}/todolist/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo list:', error);
    return [];
  }
};

export const addTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/todolist/`, taskData);
    return response.data
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/todolist/${taskId}/`);
      console.log(`Task with ID ${taskId} deleted successfully`)
    } catch (error) {
      console.error('Error adding todo:', error);
      return null;
    }
  };