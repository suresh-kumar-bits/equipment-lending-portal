/**
 * API Service
 * Centralized API utility for all backend communication
 * 
 * This file handles:
 * - Backend URL configuration (single source of truth)
 * - Token management (localStorage)
 * - Request interceptor (adds token to headers)
 * - Error handling
 * - All HTTP methods (GET, POST, PUT, DELETE)
 * 
 * File location: frontend/src/services/api.js
 */

// ============================================================
// CONFIGURATION - CHANGE BACKEND URL HERE ONLY
// ============================================================

const API_BASE_URL = 'http://localhost:5000';

// Token key for localStorage
const TOKEN_KEY = 'equipmentPortal_token';
const USER_KEY = 'equipmentPortal_user';

// ============================================================
// TOKEN MANAGEMENT FUNCTIONS
// ============================================================

/**
 * Store JWT token in localStorage
 * @param {string} token - JWT token from backend
 */
export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Retrieve JWT token from localStorage
 * @returns {string|null} - JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove JWT token from localStorage
 */
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Store user data in localStorage
 * @param {object} user - User object
 */
export const setUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

/**
 * Retrieve user data from localStorage
 * @returns {object|null} - User object or null if not found
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Remove user data from localStorage
 */
export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all auth data (token + user)
 */
export const clearAuthData = () => {
  clearToken();
  clearUser();
};

// ============================================================
// REQUEST INTERCEPTOR FUNCTION
// ============================================================

/**
 * Build request headers with JWT token
 * @returns {object} - Headers object with Authorization
 */
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// ============================================================
// ERROR HANDLING
// ============================================================

/**
 * Handle API errors
 * @param {Response} response - Fetch response object
 * @throws {Error} - Throws error with message
 */
const handleError = async (response) => {
  let errorMessage = 'An error occurred';

  try {
    const data = await response.json();
    errorMessage = data.message || errorMessage;
  } catch (e) {
    errorMessage = response.statusText || errorMessage;
  }

  const error = new Error(errorMessage);
  error.status = response.status;
  throw error;
};

// ============================================================
// HTTP METHODS
// ============================================================

/**
 * GET request
 * @param {string} endpoint - API endpoint (without base URL)
 * @returns {Promise<object>} - Response data
 */
export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      await handleError(response);
    }

    return await response.json();
  } catch (error) {
    console.error(`GET ${endpoint} error:`, error.message);
    throw error;
  }
};

/**
 * POST request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {object} data - Request body data
 * @returns {Promise<object>} - Response data
 */
export const apiPost = async (endpoint, data = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      await handleError(response);
    }

    return await response.json();
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error.message);
    throw error;
  }
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {object} data - Request body data
 * @returns {Promise<object>} - Response data
 */
export const apiPut = async (endpoint, data = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      await handleError(response);
    }

    return await response.json();
  } catch (error) {
    console.error(`PUT ${endpoint} error:`, error.message);
    throw error;
  }
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint (without base URL)
 * @returns {Promise<object>} - Response data
 */
export const apiDelete = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      await handleError(response);
    }

    return await response.json();
  } catch (error) {
    console.error(`DELETE ${endpoint} error:`, error.message);
    throw error;
  }
};

// ============================================================
// AUTH SPECIFIC FUNCTIONS
// ============================================================

/**
 * Login user
 * POST /api/auth/login
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} role - User role (student, staff, admin)
 * @returns {Promise<object>} - {token, user}
 */
export const authLogin = async (email, password, role) => {
  const response = await apiPost('/api/auth/login', {
    email,
    password,
    role,
  });

  // Store token and user if login successful
  if (response.data && response.data.token) {
    setToken(response.data.token);
    setUser(response.data.user);
  }

  return response.data;
};

/**
 * Register user
 * POST /api/auth/register
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} role - User role
 * @returns {Promise<object>} - {token, user}
 */
export const authRegister = async (name, email, password, role) => {
  const response = await apiPost('/api/auth/register', {
    name,
    email,
    password,
    role,
  });

  // Store token and user if registration successful
  if (response.data && response.data.token) {
    setToken(response.data.token);
    setUser(response.data.user);
  }

  return response.data;
};

/**
 * Get current user profile
 * GET /api/auth/me
 * @returns {Promise<object>} - User data
 */
export const authGetMe = async () => {
  const response = await apiGet('/api/auth/me');
  return response.data;
};

/**
 * Logout user (clear local storage)
 */
export const authLogout = () => {
  clearAuthData();
};

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default {
  // Configuration
  API_BASE_URL,
  
  // Token management
  setToken,
  getToken,
  clearToken,
  setUser,
  getUser,
  clearUser,
  clearAuthData,
  
  // HTTP methods
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  
  // Auth specific
  authLogin,
  authRegister,
  authGetMe,
  authLogout,
};