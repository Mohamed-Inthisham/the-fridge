// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  // No baseURL needed here because we provide full URLs in itemService
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;