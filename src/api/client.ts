import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5173';

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const message =
                typeof error.response.data === 'string'
                    ? error.response.data
                    : error.response.data?.title ?? 'Request failed';
            return Promise.reject(new Error(message));
        }
        if (error.request) {
            return Promise.reject(new Error('Network error — is the API running?'));
        }
        return Promise.reject(error);
    }
);