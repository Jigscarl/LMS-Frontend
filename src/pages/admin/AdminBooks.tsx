import { Link } from 'react-router-dom';
import { useBooks, useDeleteBook } from '../../hooks/useBooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { PlusIcon } from '../../components/Icons';

export default function AdminBooks() {
    const { data: books, isLoading, error } = useBooks();
    const deleteBook = useDeleteBook();

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
                            <th className="text-right px-4 py-3 font-medium">Actions</th>
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
                                <td className="px-4 py-3 text-right">
                                    <button
                                        type="button"
                                        disabled={deleteBook.isPending}
                                        onClick={() => {
                                            if (window.confirm(`Delete "${book.title}"? Books with loan history cannot be deleted.`)) {
                                                deleteBook.mutate(book.id);
                                            }
                                        }}
                                        className="rounded-md px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {deleteBook.isPending && deleteBook.variables === book.id ? 'Deleting…' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    No books yet. Add the first one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {deleteBook.error && (
                <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {(deleteBook.error as Error).message}
                </p>
            )}
        </div>
    );
}