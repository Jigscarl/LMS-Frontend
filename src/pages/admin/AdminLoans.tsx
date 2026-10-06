import { useLoans } from '../../hooks/useLoans';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function AdminLoans() {
    const { data: loans, isLoading, error } = useLoans();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    const list = Array.isArray(loans) ? loans : [];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">All Loans</h1>
            <p className="text-sm text-gray-500 mb-6">{list.length} loans recorded</p>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Book</th>
                            <th className="text-left px-4 py-3 font-medium">Member</th>
                            <th className="text-left px-4 py-3 font-medium">Borrowed</th>
                            <th className="text-left px-4 py-3 font-medium">Due</th>
                            <th className="text-left px-4 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {list.map((loan) => (
                            <tr key={loan.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{loan.bookTitle}</td>
                                <td className="px-4 py-3 text-gray-600">{loan.memberName}</td>
                                <td className="px-4 py-3 text-gray-500 text-xs">
                                    {new Date(loan.borrowedOn).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">
                                    {new Date(loan.dueOn).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        loan.returnedOn
                                            ? 'bg-gray-100 text-gray-600'
                                            : loan.isOverdue
                                                ? 'bg-red-50 text-red-700'
                                                : 'bg-green-50 text-green-700'
                                    }`}>
                                        {loan.returnedOn ? 'Returned' : loan.isOverdue ? 'Overdue' : 'Active'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                    No loans yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}