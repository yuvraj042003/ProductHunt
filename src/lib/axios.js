import axios from "axios";

console.log('====================================');
console.log(import.meta.env.PROD);
console.log('====================================');
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_RENDER_API_BASE_URL
  : "http://localhost:3030";


// Ensure the environment variable is set correctly
if (!BASE_URL) {
  console.error("Base URL is not defined. Please check your environment variables.");
  throw new Error("Base URL is not defined. Please check your environment variables.");
} 
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log(`[API] ${config.method?.toUpperCase()} -> ${fullUrl}`);
    console.log("Final Axios Request URL:", `${config.baseURL}${config.url}`);

    return config;
  },
);


api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
