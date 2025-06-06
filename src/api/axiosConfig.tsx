import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://marvellous-muskox-kevin903476-82a785f6.koyeb.app', 
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosConfig;
