import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition ${
            isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`;

    const closeMobile = () => setMobileOpen(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-14 items-center">
                        <NavLink
                            to="/"
                            className="text-xl font-bold text-blue-700"
                            onClick={closeMobile}
                        >
                            KhanTon LMS
                        </NavLink>

                        <div className="hidden md:flex gap-1">
                            <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
                            <NavLink to="/books" className={linkClass}>Books</NavLink>
                            <NavLink to="/members" className={linkClass}>Members</NavLink>
                            <NavLink to="/loans" className={linkClass}>Loans</NavLink>
                            <NavLink to="/fines" className={linkClass}>Fines</NavLink>
                        </div>

                        <button
                            className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-100"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {mobileOpen && (
                        <div className="md:hidden py-2 space-y-1">
                            <NavLink to="/" end className={linkClass} onClick={closeMobile}>Dashboard</NavLink>
                            <NavLink to="/books" className={linkClass} onClick={closeMobile}>Books</NavLink>
                            <NavLink to="/members" className={linkClass} onClick={closeMobile}>Members</NavLink>
                            <NavLink to="/loans" className={linkClass} onClick={closeMobile}>Loans</NavLink>
                            <NavLink to="/fines" className={linkClass} onClick={closeMobile}>Fines</NavLink>
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