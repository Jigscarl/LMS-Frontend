import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EyeIcon, EyeOffIcon } from '../components/Icons';
import logo from '../assets/logo.jpeg';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const user = await register({
                email: email.trim(),
                fullName: fullName.trim(),
                password,
                role: 'student',
                membershipNumber: membershipNumber.trim(),
            });
            navigate(user.role === 'admin' ? '/admin' : '/home', { replace: true });
        } catch (err) {
            setError((err as Error).message);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-blue-100 bg-white shadow-md overflow-hidden p-1.5 flex items-center justify-center">
                        <img
                            src={logo}
                            alt="KhanTon Library logo"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-center text-3xl font-bold text-blue-600">
                    Create your account
                </h1>
                <p className="text-center text-gray-600 mt-2 text-sm">
                    Register as a student to start borrowing books
                </p>

                {/* Card */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                autoComplete="name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full px-4 py-3 bg-slate-100 border border-transparent rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
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

                        <div>
                            <label htmlFor="membershipNumber" className="block text-sm font-semibold text-gray-800 mb-2">
                                Membership Number
                            </label>
                            <input
                                id="membershipNumber"
                                type="text"
                                required
                                value={membershipNumber}
                                onChange={(e) => setMembershipNumber(e.target.value)}
                                placeholder="e.g. S001"
                                className="w-full px-4 py-3 bg-slate-100 border border-transparent rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Provided by the library. Contact the administrator if you don't have one.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    className="w-full px-4 py-3 pr-11 bg-slate-100 border border-transparent rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md text-sm transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating account…' : 'Sign Up'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}