import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export default api;

export const getAssetUrl = (path) => {
  if (!path) return '';
  return new URL(path, api.defaults.baseURL).toString();
};
