import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Handle all responses to prevent uncaught errors
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network error:', error.request);
    } else {
      // Error in request configuration
      console.error('Request config error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Budget API calls
export const budgets = {
  getAll: () => api.get('/budget'),
  getById: (id) => api.get(`/budget/${id}`),
  create: (budget) => api.post('/budget', budget),
  update: (id, budget) => api.put(`/budget/${id}`, budget),
  delete: (id) => api.delete(`/budget/${id}`),
};

// Transaction API calls
export const transactions = {
  getAll: () => api.get('/transaction'),
  getByBudget: (budgetId) => api.get(`/transaction/budget/${budgetId}`),
  create: (transaction) => api.post('/transaction', transaction),
  update: (id, transaction) => api.put(`/transaction/${id}`, transaction),
  delete: (id) => api.delete(`/transaction/${id}`),
};

export default {
  auth,
  budgets,
  transactions,
};
