import axios from "axios";
import PocketBase from "pocketbase";

export const pbClient = new PocketBase(import.meta.env.VITE_API_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8090",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = pbClient.authStore.token || localStorage.getItem("pb_auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
