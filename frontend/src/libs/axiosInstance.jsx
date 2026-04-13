import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://chitchat-backend-qns7.onrender.comi"
      : "/api",
  withCredentials: true,
});

axiosInstance;
