import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '../../components/Icons';
import { useCreateBook } from '../../hooks/useBooks';

const currentYear = new Date().getFullYear();

export default function CreateBookPage() {
    const navigate = useNavigate();
    const createBook = useCreateBook();
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [totalCopies, setTotalCopies] = useState('1');
    const [categoryId, setCategoryId] = useState('');
    const [authorIds, setAuthorIds] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidationError(null);
        const parsedAuthorIds = authorIds.trim()
            ? authorIds.split(',').map((value) => Number(value.trim()))
            : [];

        if (parsedAuthorIds.some((id) => !Number.isSafeInteger(id) || id <= 0)) {
            setValidationError('Enter author IDs as positive numbers separated by commas.');
            return;
        }

        createBook.mutate({
            title: title.trim(),
            isbn: isbn.trim(),
            publishedYear: Number(publishedYear),
            totalCopies: Number(totalCopies),
            categoryId: Number(categoryId),
            authorIds: parsedAuthorIds,
        }, {
            onSuccess: () => navigate('/admin/books'),
        });
    };

    return (
        <div className="mx-auto max-w-3xl">
            <Link to="/admin/books" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800">
                <span aria-hidden="true">←</span> Back to books
            </Link>
            <div className="mb-6 mt-4">
                <h1 className="text-2xl font-bold text-gray-900">Add a book</h1>
                <p className="mt-1 text-sm text-gray-500">Enter the book details to add it to the catalog.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
                        Title
                        <input required maxLength={200} value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        ISBN
                        <input required value={isbn} onChange={(event) => setIsbn(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Published year
                        <input required type="number" min="0" max={currentYear} value={publishedYear} onChange={(event) => setPublishedYear(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Total copies
                        <input required type="number" min="1" step="1" value={totalCopies} onChange={(event) => setTotalCopies(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        Category ID
                        <input required type="number" min="1" step="1" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </label>
                    <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
                        Author IDs
                        <input value={authorIds} onChange={(event) => setAuthorIds(event.target.value)} placeholder="For example: 2, 5" className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                        <span className="mt-1 block text-xs font-normal text-gray-500">Use comma-separated author IDs. Leave blank if the book has no authors assigned.</span>
                    </label>
                </div>

                {(validationError || createBook.isError) && (
                    <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {validationError ?? (createBook.error as Error).message}
                    </p>
                )}

                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
                    <Link to="/admin/books" className="inline-flex min-h-10 items-center rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</Link>
                    <button type="submit" disabled={createBook.isPending} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                        {createBook.isPending ? 'Adding book…' : 'Add book'}
                        {!createBook.isPending && <ArrowRightIcon className="h-4 w-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
}