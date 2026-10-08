import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMyLoans } from '../../hooks/useLoans';
import type { Loan } from '../../types/loan';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ArrowRightIcon, LoanIcon } from '../../components/Icons';

type LoanFilter = 'current' | 'history' | 'all';

function formatDate(value: string) {
    return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function loanStatus(loan: Loan) {
    if (loan.returnedOn) return { label: 'Returned', className: 'bg-gray-100 text-gray-600' };
    if (loan.isOverdue) return { label: 'Overdue', className: 'bg-[#fbe9e5] text-[#9d3e2f]' };
    return { label: 'On loan', className: 'bg-[#e8f0e6] text-[#315d45]' };
}

export default function StudentLoans() {
    const { user } = useAuth();
    const { data: loans, isLoading, error } = useMyLoans();
    const [filter, setFilter] = useState<LoanFilter>('current');
    const memberId = user?.memberId;
    const memberLoans = Array.isArray(loans) && memberId != null
        ? loans.filter((loan) => loan.memberId === memberId)
        : [];
    const currentLoans = memberLoans.filter((loan) => !loan.returnedOn);
    const overdueCount = currentLoans.filter((loan) => loan.isOverdue).length;
    const filteredLoans = filter === 'current'
        ? memberLoans.filter((loan) => !loan.returnedOn)
        : filter === 'history'
            ? memberLoans.filter((loan) => Boolean(loan.returnedOn))
            : memberLoans;
    const visibleLoans = [...filteredLoans].sort((a, b) => new Date(b.borrowedOn).getTime() - new Date(a.borrowedOn).getTime());

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div className="space-y-7">
            <header className="border-b border-[#e1e6dc] pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52745d]">Your account</p>
                <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">My loans</h1>
                        <p className="mt-1 text-sm text-gray-600">Keep track of what you have out and what you have read.</p>
                    </div>
                    <Link to="/books" className="inline-flex items-center gap-1 text-sm font-semibold text-[#315d45] hover:text-[#173b32]">
                        Browse books <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
            </header>

            <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Overdue books incur a fine of <strong>KSh 80 per day</strong>. The fine is recorded when the book is returned.
            </p>

            {memberId == null ? (
                <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    Your account does not have a member profile loaded, so loan history cannot be shown.
                </div>
            ) : (
                <>
                    <section aria-label="Loan summary" className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-4 border-b border-[#e1e6dc] pb-4 sm:border-b-0 sm:border-r sm:pb-0">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e8f0e6] text-[#315d45]"><LoanIcon className="h-5 w-5" /></div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Currently borrowed</p>
                                <p className="mt-1 text-xl font-semibold text-gray-900">{currentLoans.length} {currentLoans.length === 1 ? 'book' : 'books'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 sm:pl-5">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-md ${overdueCount ? 'bg-[#fbe9e5] text-[#9d3e2f]' : 'bg-[#f6ead4] text-[#8a5a1f]'}`}><span className="text-lg font-semibold">{overdueCount}</span></div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Past due</p>
                                <p className="mt-1 text-xl font-semibold text-gray-900">{overdueCount ? 'Needs attention' : 'All caught up'}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-gray-900">Loan activity</h2>
                            <div className="inline-flex rounded-md border border-[#d8dfd3] bg-white p-1" aria-label="Filter loans">
                                {([
                                    ['current', 'Current'], ['history', 'Returned'], ['all', 'All']
                                ] as const).map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        aria-pressed={filter === value}
                                        onClick={() => setFilter(value)}
                                        className={`rounded px-3 py-1.5 text-sm font-medium transition ${filter === value ? 'bg-[#315d45] text-white' : 'text-gray-600 hover:bg-[#f0f3ec]'}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {visibleLoans.length === 0 ? (
                            <div className="border-y border-[#e1e6dc] py-12 text-center">
                                <LoanIcon className="mx-auto h-8 w-8 text-[#78917c]" />
                                <p className="mt-3 font-medium text-gray-900">
                                    {filter === 'history' ? 'No returned books yet' : filter === 'all' ? 'No loans recorded yet' : 'No books checked out'}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">Find something to read in the library catalog.</p>
                                <Link to="/books" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#315d45] hover:text-[#173b32]">
                                    Browse books <ArrowRightIcon className="h-4 w-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#e1e6dc] border-y border-[#e1e6dc]">
                                {visibleLoans.map((loan) => {
                                    const status = loanStatus(loan);
                                    return (
                                        <article key={loan.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-[#52745d]">Borrowed {formatDate(loan.borrowedOn)}</p>
                                                <h3 className="mt-1 truncate font-semibold text-gray-900">{loan.bookTitle}</h3>
                                                <p className="mt-1 text-sm text-gray-500">Due {formatDate(loan.dueOn)}</p>
                                            </div>
                                            <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                                                <div className="text-right">
                                                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                                                    {loan.fineAmount != null && loan.fineAmount > 0 && (
                                                        <p className={`mt-1 text-xs ${loan.fineIsPaid ? 'text-gray-500' : 'font-medium text-[#9d3e2f]'}`}>
                                                            Fine {loan.fineAmount.toFixed(2)} · {loan.fineIsPaid ? 'paid' : 'unpaid'}
                                                        </p>
                                                    )}
                                                </div>
                                                <Link to={`/books/${loan.bookId}`} aria-label={`View ${loan.bookTitle}`} className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d8dfd3] text-[#315d45] transition hover:bg-[#eef4eb]">
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}