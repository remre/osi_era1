import axios from "axios";

const userAxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userAxiosInstance;
