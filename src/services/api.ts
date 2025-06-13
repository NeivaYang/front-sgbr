import axios from 'axios';

const { VITE_GIPHY_API_URL, VITE_GIPHY_API_KEY } = process.env;

if (!VITE_GIPHY_API_URL || !VITE_GIPHY_API_KEY) {
  throw new Error('Environment variables not defined');
}

const api = axios.create({
  baseURL: VITE_GIPHY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona o parâmetro api_key em todas as requisições
api.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  config.params.api_key = VITE_GIPHY_API_KEY;
  return config;
});

export default api;
