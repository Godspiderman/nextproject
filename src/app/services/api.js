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


// Signup //


export const createUser = async (userData) => {
  try {
    console.log(userData);
    const response = await api.post('/api/public/v1/user', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
    throw error;
  }
};

// Countries //

export const getAllCountries = async () => {
  try {
    const response = await api.get('/api/public/v1/country');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error.response?.data || error.message);
    throw error;
  }
};

// States //

export const getAllStates = async () => {
  try {
    const response = await api.get('/api/public/v1/state');
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error.response?.data || error.message);
    throw error;
  }
};