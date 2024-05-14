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

export const addToDo = async (todoData) => {
  try {
    const response = await axios.post(`${API_URL}/todolist/`, todoData);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
};

export const removeToDo = async (todoId) => {
    try {
      const response = await axios.delete(`${API_URL}/todolist/`, todoId);
      return response.data;
    } catch (error) {
      console.error('Error adding todo:', error);
      return null;
    }
  };