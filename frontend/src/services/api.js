// src/services/api.js

import axios from 'axios';

// Base URL for API requests (assuming Express backend is running on localhost:5000)
const API_URL = 'http://localhost:5000/api';

export const uploadResume = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

export const optimizeResume = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/optimize-resume`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw error;
  }
};

export const getJobRecommendations = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/recommend-jobs`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting job recommendations:', error);
    throw error;
  }
};
