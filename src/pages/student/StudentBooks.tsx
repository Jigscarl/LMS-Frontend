import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ArrowRightIcon, BookIcon } from '../../components/Icons';

export default function StudentBooks() {
    const { data: books, isLoading, error } = useBooks();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [availableOnly, setAvailableOnly] = useState(false);
    const list = Array.isArray(books) ? books : [];
    const categories = [...new Set(list.map((book) => book.category))].sort((a, b) => a.localeCompare(b));
    const query = search.trim().toLocaleLowerCase();
    const filteredBooks = list.filter((book) => {
        const matchesSearch = !query || [book.title, book.category, ...book.authors]
            .some((value) => value.toLocaleLowerCase().includes(query));
        const matchesCategory = category === 'all' || book.category === category;
        const matchesAvailability = !availableOnly || book.availableCopies > 0;
        return matchesSearch && matchesCategory && matchesAvailability;
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div className="space-y-7">
            <header className="border-b border-[#e1e6dc] pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52745d]">Find your next read</p>
                <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Browse the catalog</h1>
                        <p className="mt-1 text-sm text-gray-600">Explore titles from the KhanTon collection.</p>
                    </div>
                    <p className="text-sm text-gray-500">{list.length} {list.length === 1 ? 'title' : 'titles'}</p>
                </div>
            </header>

            <section aria-label="Filter books" className="grid gap-4 rounded-md border border-[#e1e6dc] bg-white p-4 sm:grid-cols-[minmax(12rem,1fr)_minmax(10rem,0.55fr)_auto] sm:items-end">
                <label className="block text-sm font-medium text-gray-700">
                    Search
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Title, author, or category"
                        className="mt-1.5 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#52745d] focus:ring-2 focus:ring-[#dce8d8]"
                    />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                    Category
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="mt-1.5 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#52745d] focus:ring-2 focus:ring-[#dce8d8]"
                    >
                        <option value="all">All categories</option>
                        {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
                <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm text-gray-700 sm:pb-2">
                    <input
                        type="checkbox"
                        checked={availableOnly}
                        onChange={(event) => setAvailableOnly(event.target.checked)}
                        className="h-4 w-4 accent-[#315d45]"
                    />
                    Available to borrow
                </label>
            </section>

            <div className="flex items-center justify-between text-sm text-gray-500" aria-live="polite">
                <span>Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}</span>
                {(search || category !== 'all' || availableOnly) && (
                    <button
                        type="button"
                        onClick={() => { setSearch(''); setCategory('all'); setAvailableOnly(false); }}
                        className="font-medium text-[#315d45] hover:text-[#173b32]"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {list.length === 0 ? (
                <div className="border-y border-[#e1e6dc] py-12 text-center">
                    <BookIcon className="mx-auto h-8 w-8 text-[#78917c]" />
                    <p className="mt-3 font-medium text-gray-900">The catalog is empty</p>
                    <p className="mt-1 text-sm text-gray-500">New books will appear here when they are added.</p>
                </div>
            ) : filteredBooks.length === 0 ? (
                <div className="border-y border-[#e1e6dc] py-12 text-center">
                    <p className="font-medium text-gray-900">No books match those filters</p>
                    <p className="mt-1 text-sm text-gray-500">Try another search or clear your filters.</p>
                </div>
            ) : (
                <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredBooks.map((book, index) => (
                        <Link
                            key={book.id}
                            to={`/books/${book.id}`}
                            className="group flex min-h-40 gap-4 border-y border-[#e1e6dc] py-5 transition hover:border-[#8ca88d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#52745d]"
                        >
                            <div className={`flex h-28 w-[4.75rem] shrink-0 items-end rounded-sm border-l-4 p-2 shadow-sm ${
                                index % 3 === 0 ? 'border-[#b74d37] bg-[#f3d9b2] text-[#442f27]' :
                                index % 3 === 1 ? 'border-[#d3a653] bg-[#dce8d8] text-[#26453b]' :
                                'border-[#466f5d] bg-[#e8dfd2] text-[#473b2e]'
                            }`} aria-hidden="true">
                                <span className="line-clamp-4 text-[9px] font-bold uppercase leading-tight">{book.title}</span>
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col">
                                <p className="text-xs font-medium text-[#52745d]">{book.category} · {book.publishedYear}</p>
                                <h2 className="mt-1 line-clamp-2 font-semibold text-gray-900 group-hover:text-[#315d45]">{book.title}</h2>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{book.authors.join(', ')}</p>
                                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                                    <span className={`text-xs font-medium ${book.availableCopies > 0 ? 'text-[#397247]' : 'text-gray-500'}`}>
                                        {book.availableCopies > 0 ? `${book.availableCopies} available` : 'Unavailable'}
                                    </span>
                                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-[#52745d] transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}