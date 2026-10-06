import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.jpeg';

export default function StudentLayout() {
    const { user } = useAuth();
    const initials = user?.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('') || 'K';

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `whitespace-nowrap px-3 py-2 text-sm font-medium transition ${
            isActive ? 'border-b-2 border-[#315d45] text-[#244b37]' : 'border-b-2 border-transparent text-gray-600 hover:border-[#b7c9b6] hover:text-[#244b37]'
        }`;

    return (
        <div className="min-h-screen bg-[#f7f8f4]">
            <nav className="sticky top-0 z-10 border-b border-[#e1e6dc] bg-[#fbfcf9]/95 backdrop-blur">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-4">
                        <NavLink to="/home" className="flex shrink-0 items-center gap-2.5 text-[#244b37]">
                            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#d6e2d2] bg-white p-0.5">
                                <img src={logo} alt="KhanTon Library logo" className="h-full w-full rounded-full object-cover" />
                            </div>
                            <span className="text-lg font-bold leading-none">KhanTon</span>
                            <span className="hidden font-normal leading-none text-gray-400 sm:inline">Library</span>
                        </NavLink>

                        <div className="flex min-w-0 flex-1 justify-center overflow-x-auto md:flex-none">
                            <div className="flex h-16 items-center gap-1">
                                <NavLink to="/home" end className={linkClass}>Home</NavLink>
                                <NavLink to="/books" end className={linkClass}>Browse Books</NavLink>
                                <NavLink to="/my-loans" className={linkClass}>My Loans</NavLink>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4ecdf] text-sm font-semibold text-[#315d45]" aria-label={user?.fullName ?? 'Student'} title={user?.fullName ?? 'Student'}>
                                {initials.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}