import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5173';

export const TOKEN_KEY = 'khanton-lms-token';
export const USER_KEY = 'khanton-lms-user';

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every outgoing request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Normalize errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the token is rejected by the server, clear it and bounce to login
        if (error.response?.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);

            // Only redirect if we're not already on /login
            if (!window.location.pathname.startsWith('/login')) {
                window.location.href = '/login';
            }
        }

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