import axios from "axios";

const EventAxiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

export default EventAxiosInstance;
