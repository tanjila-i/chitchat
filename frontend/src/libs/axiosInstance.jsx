import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://chitchat-bac.onrender.com"
      : "/api",
  withCredentials: true,
});

axiosInstance;
