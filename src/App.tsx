import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import CreateBookPage from './pages/CreateBookPage';
import MembersPage from './pages/MembersPage';
import MemberDetailPage from './pages/MemberDetailPage';
import LoansPage from './pages/LoansPage';
import FinesPage from './pages/FinesPage';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/new" element={<CreateBookPage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/members/:id" element={<MemberDetailPage />} />
                <Route path="/loans" element={<LoansPage />} />
                <Route path="/fines" element={<FinesPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}