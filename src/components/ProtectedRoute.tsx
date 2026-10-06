import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, type Role } from '../contexts/AuthContext';

export default function ProtectedRoute({ requiredRole }: { requiredRole: Role }) {
    const { role } = useAuth();

    if (role !== requiredRole) {
        // Student trying to reach /admin → send them home
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}