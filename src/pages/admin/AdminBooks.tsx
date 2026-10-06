import { Link } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { PlusIcon } from '../../components/Icons';

export default function AdminBooks() {
    const { data: books, isLoading, error } = useBooks();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    const list = Array.isArray(books) ? books : [];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Books</h1>
                    <p className="text-sm text-gray-500 mt-1">{list.length} books in the catalog</p>
                </div>
                <Link
                    to="/admin/books/new"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Book
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Title</th>
                            <th className="text-left px-4 py-3 font-medium">Authors</th>
                            <th className="text-left px-4 py-3 font-medium">Category</th>
                            <th className="text-left px-4 py-3 font-medium">ISBN</th>
                            <th className="text-left px-4 py-3 font-medium">Available</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {list.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{book.title}</td>
                                <td className="px-4 py-3 text-gray-600">{book.authors.join(', ')}</td>
                                <td className="px-4 py-3 text-gray-600">{book.category}</td>
                                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{book.isbn}</td>
                                <td className="px-4 py-3">
                                    <span className={book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {book.availableCopies} / {book.totalCopies}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    No books yet. Add the first one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}