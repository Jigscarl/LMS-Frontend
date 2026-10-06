import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useBooks } from '../../hooks/useBooks';
import { ArrowRightIcon, BookIcon, LoanIcon } from '../../components/Icons';

export default function StudentHome() {
    const { user } = useAuth();
    const memberId = user?.memberId ?? null;
    const { data: books, isLoading, isError } = useBooks();
    const catalog = Array.isArray(books) ? books : [];
    const featuredBooks = catalog.slice(0, 3);
    const firstName = user?.fullName.trim().split(/\s+/)[0];

    return (
        <div className="space-y-9 pb-8">
            <section className="relative isolate overflow-hidden rounded-lg bg-blue-600 px-6 py-9 text-white sm:px-10 sm:py-12 lg:px-14">
                <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10 sm:right-10 sm:top-1/2 sm:-translate-y-1/2">
                    <div className="absolute inset-8 rounded-full border border-white/10" />
                    <div className="absolute inset-16 rounded-full border border-white/10" />
                </div>
                <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="max-w-2xl">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#b7d8a8]">
                            Your library, your next chapter
                        </p>
                        <h1 className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
                            {firstName ? `Good to see you, ${firstName}.` : 'Welcome to KhanTon Library.'}
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-6 text-white/75 sm:text-base">
                            Find a new perspective, revisit an old favorite, or discover where your next read will take you.
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Link
                                to="/books"
                                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#d6e8bd] px-5 text-sm font-semibold text-[#173b32] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Explore the catalog <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/my-loans"
                                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/25 px-4 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                <LoanIcon className="h-4 w-4" /> My loans
                            </Link>
                        </div>
                    </div>

                    <div className="hidden min-h-52 items-center justify-center lg:flex" aria-hidden="true">
                        <div className="relative flex h-44 items-end gap-2">
                            <div className="h-32 w-16 -rotate-6 rounded-sm border-l-4 border-[#b74d37] bg-[#f3d9b2] p-2 text-[#442f27] shadow-xl">
                                <div className="mt-2 h-px bg-[#442f27]/35" />
                                <div className="mt-2 text-[9px] font-bold uppercase leading-tight">Stories<br />to keep</div>
                                <div className="mt-3 h-8 border border-[#442f27]/25" />
                            </div>
                            <div className="z-10 h-40 w-20 rounded-sm border-l-4 border-[#d6e8bd] bg-[#466f5d] p-3 text-white shadow-2xl">
                                <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/65">KhanTon</div>
                                <div className="mt-4 text-xs font-semibold leading-snug">A world<br />between<br />the covers</div>
                                <div className="mt-4 h-px bg-white/40" />
                            </div>
                            <div className="h-36 w-16 rotate-6 rounded-sm border-l-4 border-[#d3a653] bg-[#e6eee4] p-2 text-[#26453b] shadow-xl">
                                <div className="mt-3 h-1 w-7 bg-[#26453b]/30" />
                                <div className="mt-3 text-[9px] font-bold uppercase leading-tight">Read<br />something<br />wonderful</div>
                                <div className="mt-3 h-5 w-5 rounded-full border border-[#26453b]/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label="Library at a glance" className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 border-b border-gray-200 pb-4 sm:border-b-0 sm:border-r sm:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#e8f0e6] text-[#315d45]">
                        <BookIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">In the catalog</p>
                        <p className="mt-1 text-xl font-semibold text-gray-900">
                            {isLoading ? 'Loading…' : isError ? 'Browse all titles' : `${catalog.length} ${catalog.length === 1 ? 'title' : 'titles'}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 sm:pl-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f6ead4] text-[#8a5a1f]">
                        <LoanIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Your reading list</p>
                        <Link to="/my-loans" className="mt-1 inline-flex items-center gap-1 text-xl font-semibold text-gray-900 hover:text-[#315d45]">
                            View your loans <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52745d]">A place to start</p>
                        <h2 className="mt-1 text-xl font-semibold text-gray-900">From the shelves</h2>
                    </div>
                    <Link to="/books" className="inline-flex items-center gap-1 text-sm font-semibold text-[#315d45] hover:text-[#173b32]">
                        View all books <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>

                {isLoading ? (
                    <p className="border-y border-gray-200 py-6 text-sm text-gray-500">Loading the catalog…</p>
                ) : isError ? (
                    <p className="border-y border-gray-200 py-6 text-sm text-gray-600">The catalog is unavailable right now. You can try again from Browse Books.</p>
                ) : featuredBooks.length === 0 ? (
                    <p className="border-y border-gray-200 py-6 text-sm text-gray-600">There are no books in the catalog yet.</p>
                ) : (
                    <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredBooks.map((book, index) => (
                            <Link
                                key={book.id}
                                to={`/books/${book.id}`}
                                className="group flex min-h-36 gap-4 border-y border-gray-200 py-5 transition hover:border-[#8ca88d]"
                            >
                                <div className={`flex h-24 w-[4.25rem] shrink-0 items-end rounded-sm border-l-4 p-2 shadow-sm ${
                                    index === 0 ? 'border-[#b74d37] bg-[#f3d9b2] text-[#442f27]' :
                                    index === 1 ? 'border-[#d3a653] bg-[#dce8d8] text-[#26453b]' :
                                    'border-[#466f5d] bg-[#e8dfd2] text-[#473b2e]'
                                }`} aria-hidden="true">
                                    <span className="line-clamp-3 text-[9px] font-bold uppercase leading-tight">{book.title}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-[#52745d]">{book.category}</p>
                                    <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900 group-hover:text-[#315d45]">{book.title}</h3>
                                    <p className="mt-1 truncate text-sm text-gray-500">{book.authors.join(', ')}</p>
                                    <p className={`mt-2 text-xs font-medium ${book.availableCopies > 0 ? 'text-[#397247]' : 'text-gray-500'}`}>
                                        {book.availableCopies > 0 ? `${book.availableCopies} available` : 'Currently unavailable'}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {memberId === null && (
                <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    <strong>Note:</strong> No member profile is currently loaded. This is expected
                    in the dev build. Real login will set <code>memberId</code> from the authenticated user.
                </div>
            )}
        </div>
    );
}