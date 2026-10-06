import { api } from './client';
import type { AuthResponse, AuthUser, LoginDto, RegisterDto } from '../types/auth';

function normalizeUser(raw: AuthUser): AuthUser {
    return {
        ...raw,
        role: raw.role.toLowerCase() as 'admin' | 'student',
    };
}

function normalizeResponse(raw: AuthResponse): AuthResponse {
    return {
        ...raw,
        user: normalizeUser(raw.user),
    };
}

export const authApi = {
    login: async (dto: LoginDto): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/api/auth/login', dto);
        return normalizeResponse(response.data);
    },

    register: async (dto: RegisterDto): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/api/auth/register', dto);
        return normalizeResponse(response.data);
    },

    me: async (): Promise<AuthUser> => {
        const response = await api.get<AuthUser>('/api/auth/me');
        return normalizeUser(response.data);
    },
};