import { Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import RootRedirect from './components/RootRedirect';
import StudentLayout from './components/StudentLayout';
import AdminLayout from './components/AdminLayout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Student pages
import StudentHome from './pages/student/StudentHome';
import StudentBooks from './pages/student/StudentBooks';
import StudentBookDetail from './pages/student/StudentBookDetail';
import StudentLoans from './pages/student/StudentLoans';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBooks from './pages/admin/AdminBooks';
import CreateMemberPage from './pages/admin/CreateMemberPage';
import AdminMembers from './pages/admin/AdminMembers';
import AdminLoans from './pages/admin/AdminLoans';
import AdminFines from './pages/admin/AdminFines';
import CreateBookPage from './pages/admin/CreateBookPage';

import NotFound from './pages/NotFound';

export default function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/staff/login" element={<Navigate to="/login" replace />} />

            {/* Root — redirects based on auth state */}
            <Route path="/" element={<RootRedirect />} />

            {/* Student area */}
            <Route element={<RequireAuth requiredRole="student" />}>
                <Route element={<StudentLayout />}>
                    <Route path="/home" element={<StudentHome />} />
                    <Route path="/books" element={<StudentBooks />} />
                    <Route path="/books/:id" element={<StudentBookDetail />} />
                    <Route path="/my-loans" element={<StudentLoans />} />
                </Route>
            </Route>

            {/* Admin area */}
            <Route element={<RequireAuth requiredRole="admin" />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/books" element={<AdminBooks />} />
                    <Route path="/admin/books/new" element={<CreateBookPage />} />
                    <Route path="/admin/members" element={<AdminMembers />} />
                    <Route path="/admin/members/new" element={<CreateMemberPage />} />
                    <Route path="/admin/loans" element={<AdminLoans />} />
                    <Route path="/admin/fines" element={<AdminFines />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}