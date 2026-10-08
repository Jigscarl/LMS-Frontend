import { Link } from 'react-router-dom';
import { useMyFines } from '../../hooks/useFines';
import { useMyLoans } from '../../hooks/useLoans';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

const finePerDay = 80;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

function formatDate(value: string) {
    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function formatAmount(amount: number) {
    return `KSh ${amount.toFixed(2)}`;
}

export default function StudentFines() {
    const finesQuery = useMyFines();
    const loansQuery = useMyLoans();

    if (finesQuery.isLoading || loansQuery.isLoading) return <LoadingSpinner />;
    if (finesQuery.error) return <ErrorMessage message={(finesQuery.error as Error).message} />;
    if (loansQuery.error) return <ErrorMessage message={(loansQuery.error as Error).message} />;

    const fines = Array.isArray(finesQuery.data) ? finesQuery.data : [];
    const overdueLoans = (Array.isArray(loansQuery.data) ? loansQuery.data : [])
        .filter((loan) => loan.isOverdue && !loan.returnedOn)
        .map((loan) => {
            const overdueDays = Math.ceil(
                (Date.now() - new Date(loan.dueOn).getTime()) / millisecondsPerDay,
            );
            return { loan, overdueDays, estimate: overdueDays * finePerDay };
        })
        .filter(({ overdueDays }) => overdueDays > 0);
    const outstandingTotal = fines
        .filter((fine) => !fine.isPaid)
        .reduce((total, fine) => total + fine.amount, 0);
    const estimatedTotal = overdueLoans.reduce((total, item) => total + item.estimate, 0);

    return (
        <div className="space-y-7">
            <header className="border-b border-[#e1e6dc] pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52745d]">Your account</p>
                <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">My fines</h1>
                        <p className="mt-1 text-sm text-gray-600">Review recorded fines and any currently accruing overdue charges.</p>
                    </div>
                    <Link to="/my-loans" className="text-sm font-semibold text-[#315d45] hover:text-[#173b32]">
                        View my loans
                    </Link>
                </div>
            </header>

            <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Overdue books incur a fine of <strong>KSh 80 per day</strong>. Estimates are based on the current overdue period; the final fine is recorded when the book is returned.
            </div>

            <section className="grid gap-4 sm:grid-cols-2" aria-label="Fine totals">
                <div className="border-b border-[#e1e6dc] pb-4 sm:border-b-0 sm:border-r sm:pb-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Unpaid recorded fines</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">{formatAmount(outstandingTotal)}</p>
                </div>
                <div className="sm:pl-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Accruing on overdue books</p>
                    <p className="mt-1 text-xl font-semibold text-gray-900">{formatAmount(estimatedTotal)}</p>
                </div>
            </section>

            <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">Recorded fines</h2>
                {fines.length === 0 ? (
                    <p className="border-y border-[#e1e6dc] py-8 text-center text-sm text-gray-600">No recorded fines.</p>
                ) : (
                    <div className="divide-y divide-[#e1e6dc] border-y border-[#e1e6dc]">
                        {fines.map((fine) => (
                            <article key={fine.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{fine.bookTitle}</h3>
                                    <p className="mt-1 text-sm text-gray-600">Due {formatDate(fine.dueOn)}</p>
                                </div>
                                <div className="flex items-center justify-between gap-4 sm:justify-end">
                                    <p className="font-semibold text-gray-900">{formatAmount(fine.amount)}</p>
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${fine.isPaid ? 'bg-[#e8f0e6] text-[#315d45]' : 'bg-[#fbe9e5] text-[#9d3e2f]'}`}>
                                        {fine.isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">Currently overdue</h2>
                {overdueLoans.length === 0 ? (
                    <p className="border-y border-[#e1e6dc] py-8 text-center text-sm text-gray-600">No overdue books.</p>
                ) : (
                    <div className="divide-y divide-[#e1e6dc] border-y border-[#e1e6dc]">
                        {overdueLoans.map(({ loan, overdueDays, estimate }) => (
                            <article key={loan.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{loan.bookTitle}</h3>
                                    <p className="mt-1 text-sm text-gray-600">Due {formatDate(loan.dueOn)} · {overdueDays} {overdueDays === 1 ? 'day' : 'days'} overdue</p>
                                </div>
                                <p className="font-semibold text-[#9d3e2f]">Estimated {formatAmount(estimate)}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}