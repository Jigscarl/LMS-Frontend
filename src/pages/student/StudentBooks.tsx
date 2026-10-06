import { Link } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function StudentBooks() {
    const { data: books, isLoading, error } = useBooks();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    const list = Array.isArray(books) ? books : [];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Browse Books</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {list.length} books in the catalog
                </p>
            </div>

            {list.length === 0 ? (
                <p className="text-gray-500">No books in the catalog yet.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {list.map((book) => (
                        <Link
                            key={book.id}
                            to={`/books/${book.id}`}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-4 block"
                        >
                            <h3 className="font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 truncate">
                                {book.authors.join(', ')}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                                {book.category} · {book.publishedYear}
                            </p>
                            <div className="mt-3">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                    book.availableCopies > 0
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-red-50 text-red-700'
                                }`}>
                                    {book.availableCopies > 0
                                        ? `${book.availableCopies} available`
                                        : 'Not available'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}