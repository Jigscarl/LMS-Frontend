import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookIcon, EyeIcon, EyeOffIcon } from '../components/Icons';
import type { AuthUser } from '../types/auth';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const from = (location.state as { from?: string })?.from ?? null;

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const user: AuthUser = await login(email, password);
            const defaultHome = user.role === 'admin' ? '/admin' : '/home';
            navigate(from ?? defaultHome, { replace: true });
        } catch (err) {
            setError((err as Error).message);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                        <BookIcon className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-center text-3xl font-bold text-blue-600">
                    Hi, welcome back
                </h1>
                <p className="text-center text-gray-600 mt-2 text-sm">
                    Please fill in your details to log in
                </p>

                {/* Card */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={onSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800 mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-slate-100 border border-transparent rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-11 bg-slate-100 border border-transparent rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Remember me
                            </label>
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md text-sm transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Primary footer — student signup */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 mt-4 mb-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Secondary footer — staff login */}
                <p className="text-center text-xs text-gray-500">
                    Library staff?{' '}
                    <Link
                        to="/staff/login"
                        className="font-medium text-gray-700 hover:text-blue-600 underline underline-offset-2"
                    >
                        Staff Login
                    </Link>
                </p>
            </div>
        </div>
    );
}