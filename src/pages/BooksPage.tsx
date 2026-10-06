import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function BooksPage() {
    const { data: books, isLoading, error } = useBooks();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Books</h2>
                <Link
                    to="/books/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Book
                </Link>
            </div>

            {books && books.length === 0 && (
                <p className="text-gray-500">No books yet. Add the first one!</p>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {books?.map((book) => (
                    <Link
                        key={book.id}
                        to={`/books/${book.id}`}
                        className="bg-white rounded shadow-sm p-4 hover:shadow-md transition"
                    >
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        <p className="text-sm text-gray-600">{book.authors.join(', ')}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            {book.category} · {book.publishedYear}
                        </p>
                        <p className={`mt-3 text-sm ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {book.availableCopies} of {book.totalCopies} available
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}