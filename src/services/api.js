import axios from "axios";
import Cookies from 'js-cookie'
// Create an Axios instance
const api = axios.create({
  baseURL: "https://frontend2-dmbdehgbg6a8czce.uksouth-01.azurewebsites.net/api",
});

// Add Authorization header to every request if JWT exists
api.interceptors.request.use((config) => {
  const token = Cookies.get("jwtToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
