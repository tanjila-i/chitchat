import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://chitchat-backend-g0bv.onrender.com"
      : "/api",
  withCredentials: true,
});

axiosInstance;
