import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogoutIcon } from './Icons';
import logo from '../assets/logo.jpeg';

export default function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition ${
            isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`;

    const closeMobile = () => setMobileOpen(false);
    const handleLogout = () => {
        closeMobile();
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-14 items-center">
                        <NavLink
                            to="/admin"
                            className="flex items-center gap-2.5 text-blue-700"
                            onClick={closeMobile}
                        >
                            <div className="h-9 w-9 rounded-full overflow-hidden border border-blue-100 bg-white p-0.5 shrink-0">
                                <img src={logo} alt="KhanTon Library logo" className="h-full w-full object-cover rounded-full" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold leading-none">KhanTon</span>
                            <span className="text-gray-400 font-normal leading-none hidden sm:inline">Admin</span>
                        </NavLink>

                        <div className="hidden md:flex gap-1">
                            <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
                            <NavLink to="/admin/books" className={linkClass}>Books</NavLink>
                            <NavLink to="/admin/members" className={linkClass}>Members</NavLink>
                            <NavLink to="/admin/loans" className={linkClass}>Loans</NavLink>
                            <NavLink to="/admin/fines" className={linkClass}>Fines</NavLink>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={handleLogout}
                                aria-label="Log out"
                                title="Log out"
                                className="inline-flex items-center gap-2 rounded-md p-2 text-gray-700 transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <LogoutIcon className="h-5 w-5" />
                                <span className="hidden text-sm font-medium md:inline">Log out</span>
                            </button>
                            <button
                                className="rounded p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileOpen}
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    {mobileOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {mobileOpen && (
                        <div className="md:hidden py-2 space-y-1">
                            <NavLink to="/admin" end className={linkClass} onClick={closeMobile}>Dashboard</NavLink>
                            <NavLink to="/admin/books" className={linkClass} onClick={closeMobile}>Books</NavLink>
                            <NavLink to="/admin/members" className={linkClass} onClick={closeMobile}>Members</NavLink>
                            <NavLink to="/admin/loans" className={linkClass} onClick={closeMobile}>Loans</NavLink>
                            <NavLink to="/admin/fines" className={linkClass} onClick={closeMobile}>Fines</NavLink>
                            <button type="button" onClick={handleLogout} className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100">Log out</button>
                        </div>
                    )}
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>
        </div>
    );
}