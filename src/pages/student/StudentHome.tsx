import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookIcon, LoanIcon } from '../../components/Icons';

export default function StudentHome() {
    const { user } = useAuth();
const memberId = user?.memberId ?? null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome to KhanTon Library
                </h1>
                <p className="text-gray-600 mt-1">
                    Browse the catalog and manage your loans.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    to="/books"
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-6 block"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                            <BookIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">Browse Books</h2>
                            <p className="text-sm text-gray-500">Find your next read</p>
                        </div>
                    </div>
                </Link>

                <Link
                    to="/my-loans"
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-6 block"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-purple-50 text-purple-600">
                            <LoanIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">My Loans</h2>
                            <p className="text-sm text-gray-500">See what you're reading</p>
                        </div>
                    </div>
                </Link>
            </div>

            {memberId === null && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 text-sm">
                    <strong>Note:</strong> No member profile is currently loaded. This is expected
                    in the dev build. Real login will set <code>memberId</code> from the authenticated user.
                </div>
            )}
        </div>
    );
}