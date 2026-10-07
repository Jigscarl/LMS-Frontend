import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '../../components/Icons';
import { useCreateBook } from '../../hooks/useBooks';
import { useAuthors, useCategories, useCreateAuthor, useCreateCategory } from '../../hooks/useCatalog';

const currentYear = new Date().getFullYear();

export default function CreateBookPage() {
    const navigate = useNavigate();
    const createBook = useCreateBook();
    const categoriesQuery = useCategories();
    const authorsQuery = useAuthors();
    const createCategory = useCreateCategory();
    const createAuthor = useCreateAuthor();
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [totalCopies, setTotalCopies] = useState('1');
    const [categoryName, setCategoryName] = useState('');
    const [authorNames, setAuthorNames] = useState('');
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmissionError(null);
        const normalizedCategoryName = categoryName.trim();
        const uniqueAuthorNames = [...new Map(
            authorNames.split(/\r?\n/)
                .map((name) => name.trim())
                .filter(Boolean)
                .map((name) => [name.toLocaleLowerCase(), name] as const)
        ).values()];

        if (!normalizedCategoryName) {
            setSubmissionError('Enter a category name.');
            return;
        }

        try {
            const existingCategory = categoriesQuery.data?.find(
                (category) => category.name.toLocaleLowerCase() === normalizedCategoryName.toLocaleLowerCase()
            );
            const category = existingCategory ?? await createCategory.mutateAsync({ name: normalizedCategoryName });

            const authorIds = await Promise.all(uniqueAuthorNames.map(async (name) => {
                const existingAuthor = authorsQuery.data?.find(
                    (author) => author.name.toLocaleLowerCase() === name.toLocaleLowerCase()
                );
                const author = existingAuthor ?? await createAuthor.mutateAsync({ name });
                return author.id;
            }));

            await createBook.mutateAsync({
                title: title.trim(),
                isbn: isbn.trim(),
                publishedYear: Number(publishedYear),
                totalCopies: Number(totalCopies),
                categoryId: category.id,
                authorIds,
            });
            navigate('/admin/books');
        } catch (error) {
            setSubmissionError(error instanceof Error ? error.message : 'Unable to add this book.');
        }
    };

    const isLoadingCatalog = categoriesQuery.isLoading || authorsQuery.isLoading;
    const isSubmitting = createCategory.isPending || createAuthor.isPending || createBook.isPending;
    const catalogError = categoriesQuery.error ?? authorsQuery.error;

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
                        Category
                        <input required list="book-categories" maxLength={100} value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="e.g. Computer Science" className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                        <datalist id="book-categories">
                            {(categoriesQuery.data ?? []).map((category) => <option key={category.id} value={category.name} />)}
                        </datalist>
                        <span className="mt-1 block text-xs font-normal text-gray-500">Choose an existing category or enter a new one.</span>
                    </label>
                    <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
                        Authors
                        <textarea rows={3} maxLength={1000} value={authorNames} onChange={(event) => setAuthorNames(event.target.value)} placeholder={'Enter one author name per line\nFor example: Ada Lovelace'} className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                        <span className="mt-1 block text-xs font-normal text-gray-500">Existing authors are matched by name; new names are added to the author list automatically.</span>
                    </label>
                </div>

                {catalogError && (
                    <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        Could not load categories or authors: {(catalogError as Error).message}
                    </p>
                )}
                {submissionError && (
                    <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {submissionError}
                    </p>
                )}

                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
                    <Link to="/admin/books" className="inline-flex min-h-10 items-center rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</Link>
                    <button type="submit" disabled={isLoadingCatalog || Boolean(catalogError) || isSubmitting} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                        {isSubmitting ? 'Adding book…' : 'Add book'}
                        {!isSubmitting && <ArrowRightIcon className="h-4 w-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
}