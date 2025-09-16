import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel API endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach it
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
