import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../api/auth';
import { TOKEN_KEY, USER_KEY } from '../api/client';
import type { AuthUser, RegisterDto } from '../types/auth';

interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isStudent: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    register: (dto: RegisterDto) => Promise<AuthUser>;
    logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const raw = localStorage.getItem(USER_KEY);
            return raw ? (JSON.parse(raw) as AuthUser) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
        else localStorage.removeItem(USER_KEY);
    }, [user]);

    const login = async (email: string, password: string): Promise<AuthUser> => {
        const response = await authApi.login({ email, password });
        localStorage.setItem(TOKEN_KEY, response.token);
        setUser(response.user);
        return response.user;
    };

    const register = async (dto: RegisterDto): Promise<AuthUser> => {
        const response = await authApi.register(dto);
        localStorage.setItem(TOKEN_KEY, response.token);
        setUser(response.user);
        return response.user;
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isAdmin: user?.role === 'admin',
                isStudent: user?.role === 'student',
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}