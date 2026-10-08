export type Role = 'student' | 'admin';

export interface AuthUser {
    id: number;
    email: string;
    fullName: string;
    role: Role;
    memberId: number | null;
}

export interface AuthResponse {
    token: string;
    expiresAt: string;
    user: AuthUser;
}

export interface LoginDto {
    email: string;
    password: string;
    membershipNumber?: string;
}

export interface RegisterDto {
    email: string;
    fullName: string;
    password: string;
    role: Role;
    membershipNumber: string;
}