import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const multipartApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Login function
export const loginUser = async (credentials) => {
  try {
    console.log(credentials);
    const response = await api.post('/api/public/v1/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};