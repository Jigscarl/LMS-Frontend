import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RoleSwitcher() {
    const { role, setRole } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const toggle = () => {
        const next = role === 'admin' ? 'student' : 'admin';
        setRole(next);
        // Navigate to the appropriate home for the new role
        navigate(next === 'admin' ? '/admin' : '/', { replace: true });
    };

    // Hide the switcher when on the student root to avoid clutter
    // (Optional — you can remove this if you want it always visible)
    const hide = location.pathname === '/';

    if (hide) return null;

    return (
        <button
            onClick={toggle}
            className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-full shadow-lg hover:bg-gray-800 transition"
            title="Dev tool — switches between Student and Admin views"
        >
            Switch to {role === 'admin' ? 'Student' : 'Admin'} view
        </button>
    );
}