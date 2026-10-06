import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

export default function StudentLayout() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition ${
            isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`;

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-14 items-center">
                        <NavLink to="/" className="flex items-center gap-2.5 text-blue-700">
                            <div className="h-9 w-9 rounded-full overflow-hidden border border-blue-100 bg-white p-0.5 shrink-0">
                                <img src={logo} alt="KhanTon Library logo" className="h-full w-full object-cover rounded-full" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold leading-none">KhanTon</span>
                            <span className="text-gray-400 font-normal leading-none hidden sm:inline">Library</span>
                        </NavLink>

                       <div className="hidden md:flex gap-1">
    <NavLink to="/home" end className={linkClass}>Home</NavLink>
    <NavLink to="/books" className={linkClass}>Browse Books</NavLink>
    <NavLink to="/my-loans" className={linkClass}>My Loans</NavLink>
    <NavLink to="/my-loans" className={linkClass}>Borrowed Books</NavLink>

</div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                                A
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>
        </div>
    );
}