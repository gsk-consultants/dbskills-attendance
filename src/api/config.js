import axios from "axios";

const API_BASE_URL = "http://192.168.1.11:4000/api"; // 👈 replace with your PC IP

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = global.authToken;  // store token globally
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
