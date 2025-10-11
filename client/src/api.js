import axios from "axios";

const API = axios.create({
  baseURL: "https://climaguard.onrender.com/api/reports",
});

export default API;
