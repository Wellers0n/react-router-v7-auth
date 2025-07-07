import axios from "axios";

function Api() {
  const url = process.env.BASE_URL || "http://localhost:3000";
    
  const api = axios.create({
    baseURL: url,
    withCredentials: true,
  });

  return api;
}

export default Api;