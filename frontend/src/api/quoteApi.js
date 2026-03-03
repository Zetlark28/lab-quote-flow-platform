import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({ baseURL: API_BASE });

export const createQuote = (dto) => api.post('/quotes/create', dto);

export const getQuoteById = (id) => api.get(`/quotes/${id}`);

export const updateQuote = (id, dto) => api.put(`/quotes/${id}`, dto);

export const deleteQuote = (id) => api.delete(`/quotes/${id}`);

export const sendToApproval = (id) => api.post(`/quotes/send-to-approval?id=${id}`);

export const getAllQuotes = (params) => api.get('/quotes', { params });
