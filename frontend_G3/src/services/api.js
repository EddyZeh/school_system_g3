// src/services/api.js

const API_BASE_URL = 'http://localhost:7070/api';

async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

const apiService = {
  async login(loginData) {
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData)
    });
  },

  async signup(signupData) {
    return makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData)
    });
  },

  // Add more API methods as needed
};

export default apiService;