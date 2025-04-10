import axios from 'axios';

const API_BASE_URL = 'https://ai-resume-backend-fsq4.onrender.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

