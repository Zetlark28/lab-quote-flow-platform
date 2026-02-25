import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({ baseURL: API_BASE });

export const createQuote = (dto) => api.post('/quotes/create', dto);

export const getQuoteById = (id) => api.get(`/quotes/${id}`);

export const sendToApproval = (id) => api.post(`/quotes/send-to-approval?id=${id}`);

export const getAllQuotes = () => api.get('/quotes/all');
