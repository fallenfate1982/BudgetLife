import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:60960/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
