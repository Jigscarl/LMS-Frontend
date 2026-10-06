import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ArrowRightIcon, BookIcon } from '../../components/Icons';
import { useBook } from '../../hooks/useBooks';
import { useBorrow } from '../../hooks/useLoans';

export default function StudentBookDetail() {
    const { id } = useParams();
    const bookId = Number(id);
    const { user } = useAuth();
    const { data: book, isLoading, error } = useBook(bookId);
    const borrow = useBorrow();

    if (!Number.isFinite(bookId) || bookId <= 0) {
        return <ErrorMessage message="This book could not be found." />;
    }
    if (isLoading) return <LoadingSpinner />;
    if (error || !book) return <ErrorMessage message={(error as Error | null)?.message ?? 'This book could not be found.'} />;

    const canBorrow = user?.memberId !== null && user?.memberId !== undefined && book.availableCopies > 0 && !borrow.isPending;

    return (
        <div className="space-y-7">
            <Link to="/books" className="inline-flex items-center gap-2 text-sm font-medium text-[#315d45] hover:text-[#173b32]">
                <span aria-hidden="true">←</span> Back to catalog
            </Link>

            <article className="overflow-hidden rounded-lg border border-[#e1e6dc] bg-white">
                <div className="h-2 bg-[#315d45]" />
                <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[14rem_1fr] lg:p-12">
                    <div className="flex justify-center lg:justify-start">
                        <div className="flex aspect-[3/4] w-44 flex-col justify-between rounded-sm border-l-8 border-[#b74d37] bg-[#f3d9b2] p-5 text-[#442f27] shadow-lg sm:w-52" aria-label={`Decorative title panel for ${book.title}`}>
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">KhanTon Library</p>
                                <div className="mt-3 h-px bg-[#442f27]/30" />
                            </div>
                            <h2 className="line-clamp-5 text-xl font-bold leading-tight">{book.title}</h2>
                            <p className="line-clamp-2 text-sm">{book.authors.join(', ')}</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52745d]">{book.category} · {book.publishedYear}</p>
                        <h1 className="mt-2 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">{book.title}</h1>
                        <p className="mt-3 text-base text-gray-600">by {book.authors.join(', ')}</p>

                        <div className="mt-7 grid gap-4 border-y border-[#e1e6dc] py-5 sm:grid-cols-2">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Availability</p>
                                <p className={`mt-1 font-semibold ${book.availableCopies > 0 ? 'text-[#397247]' : 'text-gray-600'}`}>
                                    {book.availableCopies > 0 ? `${book.availableCopies} of ${book.totalCopies} copies available` : 'No copies available'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">ISBN</p>
                                <p className="mt-1 font-medium text-gray-900">{book.isbn}</p>
                            </div>
                        </div>

                        <div className="mt-auto pt-6">
                            {user?.memberId == null ? (
                                <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                                    Your account does not have a member profile yet, so borrowing is unavailable.
                                </p>
                            ) : null}
                            {borrow.isError && <p role="alert" className="mb-4 text-sm text-red-700">{(borrow.error as Error).message}</p>}
                            {borrow.isSuccess && (
                                <p role="status" className="mb-4 rounded-md border border-[#cbdcc8] bg-[#eef4eb] p-3 text-sm text-[#315d45]">
                                    Borrow request submitted. <Link to="/my-loans" className="font-semibold underline">View your loans</Link>
                                </p>
                            )}
                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    type="button"
                                    disabled={!canBorrow}
                                    onClick={() => user?.memberId != null && borrow.mutate({ bookId: book.id, memberId: user.memberId })}
                                    className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#315d45] px-5 text-sm font-semibold text-white transition hover:bg-[#244b37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d45] disabled:cursor-not-allowed disabled:bg-gray-300"
                                >
                                    <BookIcon className="h-4 w-4" />
                                    {borrow.isPending ? 'Submitting…' : 'Borrow this book'}
                                </button>
                                <Link to="/my-loans" className="inline-flex items-center gap-1 text-sm font-medium text-[#315d45] hover:text-[#173b32]">
                                    My loans <ArrowRightIcon className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}