// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL, // base URL cho toàn bộ API
  timeout: 5000,
});

// Thêm interceptor để tự động gắn Authorization vào tất cả request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
