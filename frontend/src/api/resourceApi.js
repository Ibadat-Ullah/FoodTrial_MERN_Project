import api from './apiClient';

export const getAll = (endpoint) => api.get(`/${endpoint}`).then((response) => response.data);
export const getOne = (endpoint, id) => api.get(`/${endpoint}/${id}`).then((response) => response.data);
export const createOne = (endpoint, data) => api.post(`/${endpoint}`, data).then((response) => response.data);
export const updateOne = (endpoint, id, data) => api.put(`/${endpoint}/${id}`, data).then((response) => response.data);
export const deleteOne = (endpoint, id) => api.delete(`/${endpoint}/${id}`).then((response) => response.data);
