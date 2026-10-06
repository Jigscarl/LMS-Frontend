import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { useMembers } from '../hooks/useMembers';
import { useLoans } from '../hooks/useLoans';
import { useFines } from '../hooks/useFines';
import {
    BookIcon,
    UsersIcon,
    LoanIcon,
    MoneyIcon,
    CheckCircleIcon,
    AlertIcon,
    PlusIcon,
    ArrowRightIcon,
} from '../components/Icons';

export default function Dashboard() {
    const booksQuery = useBooks();
    const membersQuery = useMembers();
    const loansQuery = useLoans();
    const finesQuery = useFines(true);

    const books = Array.isArray(booksQuery.data) ? booksQuery.data : [];
    const members = Array.isArray(membersQuery.data) ? membersQuery.data : [];
    const loans = Array.isArray(loansQuery.data) ? loansQuery.data : [];
    const fines = Array.isArray(finesQuery.data) ? finesQuery.data : [];

    const activeLoans = loans.filter((l) => l && l.returnedOn === null);
    const overdueLoans = activeLoans.filter((l) => l && l.isOverdue === true);
    const unpaidTotal = fines.reduce((sum, f) => sum + (Number(f?.amount) || 0), 0);
    const availableCopies = books.reduce((s, b) => s + (Number(b?.availableCopies) || 0), 0);
    const totalCopies = books.reduce((s, b) => s + (Number(b?.totalCopies) || 0), 0);
    const activeMembers = members.filter((m) => m && m.isActive === true).length;

    const utilisation = totalCopies > 0
        ? Math.round(((totalCopies - availableCopies) / totalCopies) * 100)
        : 0;

    const isLoading =
        booksQuery.isLoading ||
        membersQuery.isLoading ||
        loansQuery.isLoading ||
        finesQuery.isLoading;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome to KhanTon LMS
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Your library at a glance
                    </p>
                </div>
                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        Loading data…
                    </div>
                )}
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
                <Link
                    to="/books/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Book
                </Link>
                <Link
                    to="/members"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Member
                </Link>
                <Link
                    to="/loans"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition"
                >
                    <LoanIcon className="w-4 h-4" />
                    Borrow a Book
                </Link>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Books"
                    value={books.length}
                    detail={`${availableCopies} of ${totalCopies} available`}
                    accent="blue"
                    icon={<BookIcon className="w-5 h-5" />}
                    link="/books"
                />
                <StatCard
                    label="Members"
                    value={members.length}
                    detail={`${activeMembers} active`}
                    accent="green"
                    icon={<UsersIcon className="w-5 h-5" />}
                    link="/members"
                />
                <StatCard
                    label="Active Loans"
                    value={activeLoans.length}
                    detail={overdueLoans.length > 0 ? `${overdueLoans.length} overdue` : 'All on time'}
                    accent={overdueLoans.length > 0 ? 'red' : 'purple'}
                    icon={<LoanIcon className="w-5 h-5" />}
                    link="/loans"
                />
                <StatCard
                    label="Unpaid Fines"
                    value={fines.length}
                    detail={`KSh ${unpaidTotal.toLocaleString()}`}
                    accent="orange"
                    icon={<MoneyIcon className="w-5 h-5" />}
                    link="/fines"
                />
            </div>

            {/* Two-column insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Panel
                    title="Overdue Loans"
                    subtitle={overdueLoans.length > 0 ? 'Needs attention' : 'Nothing overdue'}
                    actionLabel="View all"
                    actionTo="/loans"
                >
                    {overdueLoans.length === 0 ? (
                        <EmptyState
                            icon={<CheckCircleIcon className="w-8 h-8 text-green-600" />}
                            title="All caught up"
                            message="No overdue books right now."
                        />
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {overdueLoans.slice(0, 5).map((loan) => (
                                <li key={loan.id} className="py-3 flex justify-between items-start gap-3">
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm text-gray-900 truncate">
                                            {loan.bookTitle ?? 'Unknown book'}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {loan.memberName ?? 'Unknown member'}
                                        </p>
                                    </div>
                                    <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                                        <AlertIcon className="w-3 h-3" />
                                        Overdue
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Panel>

                <Panel
                    title="Recent Unpaid Fines"
                    subtitle={fines.length > 0 ? `Total: KSh ${unpaidTotal.toLocaleString()}` : 'No outstanding balance'}
                    actionLabel="View all"
                    actionTo="/fines"
                >
                    {fines.length === 0 ? (
                        <EmptyState
                            icon={<CheckCircleIcon className="w-8 h-8 text-green-600" />}
                            title="No unpaid fines"
                            message="Everyone's in good standing."
                        />
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {fines.slice(0, 5).map((fine) => (
                                <li key={fine.id} className="py-3 flex justify-between items-start gap-3">
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm text-gray-900 truncate">
                                            {fine.memberName ?? 'Unknown member'}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {fine.bookTitle ?? 'Unknown book'}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-sm font-semibold text-orange-600">
                                        KSh {(Number(fine.amount) || 0).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Panel>
            </div>

            {/* Recent Activity */}
            <Panel
                title="Recent Activity"
                subtitle="Last 10 loans across all members"
                actionLabel="View all"
                actionTo="/loans"
            >
                {loans.length === 0 ? (
                    <EmptyState
                        icon={<BookIcon className="w-8 h-8 text-gray-400" />}
                        title="No activity yet"
                        message="Loans will appear here as they happen."
                    />
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {loans.slice(0, 10).map((loan) => (
                            <li key={loan.id} className="py-3 flex items-center justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {loan.bookTitle ?? 'Unknown book'}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        Borrowed by {loan.memberName ?? 'Unknown member'}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-xs text-gray-500">
                                        {loan.returnedOn
                                            ? `Returned ${new Date(loan.returnedOn).toLocaleDateString()}`
                                            : `Due ${new Date(loan.dueOn).toLocaleDateString()}`}
                                    </p>
                                    <span className={`text-xs font-medium ${
                                        loan.returnedOn ? 'text-gray-400'
                                        : loan.isOverdue ? 'text-red-600'
                                        : 'text-green-600'
                                    }`}>
                                        {loan.returnedOn ? 'Returned' : loan.isOverdue ? 'Overdue' : 'Active'}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </Panel>

            {/* Utilisation bar */}
            <Panel title="Collection Utilisation" subtitle={`${utilisation}% of copies currently on loan`}>
                <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${
                                utilisation > 80 ? 'bg-red-500'
                                : utilisation > 50 ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(0, utilisation))}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0%</span>
                        <span>{availableCopies} available / {totalCopies} total</span>
                        <span>100%</span>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

// ---------- Reusable subcomponents ----------

type Accent = 'blue' | 'green' | 'purple' | 'red' | 'orange';

const accentClasses: Record<Accent, { bg: string; text: string; icon: string }> = {
    blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   icon: 'text-blue-600' },
    green:  { bg: 'bg-green-50',  text: 'text-green-700',  icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-600' },
    red:    { bg: 'bg-red-50',    text: 'text-red-700',    icon: 'text-red-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700', icon: 'text-orange-600' },
};

function StatCard({
    label, value, detail, accent, icon, link,
}: {
    label: string;
    value: number;
    detail: string;
    accent: Accent;
    icon: React.ReactNode;
    link: string;
}) {
    const c = accentClasses[accent];
    return (
        <Link
            to={link}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 p-5 block"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${c.bg} ${c.icon}`}>
                            {icon}
                        </div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {label}
                        </p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-3">{value}</p>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition" />
            </div>
            <p className={`text-sm mt-3 ${c.text}`}>{detail}</p>
        </Link>
    );
}

function Panel({
    title, subtitle, actionLabel, actionTo, children,
}: {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionTo?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
                </div>
                {actionLabel && actionTo && (
                    <Link
                        to={actionTo}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        {actionLabel}
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                )}
            </div>
            {children}
        </div>
    );
}

function EmptyState({
    icon, title, message,
}: {
    icon: React.ReactNode;
    title: string;
    message: string;
}) {
    return (
        <div className="text-center py-6">
            <div className="flex justify-center mb-2">{icon}</div>
            <p className="font-medium text-gray-900">{title}</p>
            <p className="text-sm text-gray-500 mt-1">{message}</p>
        </div>
    );
}