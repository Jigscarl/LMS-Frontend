import { useFines } from '../../hooks/useFines';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function AdminFines() {
    const { data: fines, isLoading, error } = useFines(false);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    const list = Array.isArray(fines) ? fines : [];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">All Fines</h1>
            <p className="text-sm text-gray-500 mb-6">{list.length} fines recorded</p>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Member</th>
                            <th className="text-left px-4 py-3 font-medium">Book</th>
                            <th className="text-left px-4 py-3 font-medium">Amount</th>
                            <th className="text-left px-4 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {list.map((fine) => (
                            <tr key={fine.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{fine.memberName}</td>
                                <td className="px-4 py-3 text-gray-600">{fine.bookTitle}</td>
                                <td className="px-4 py-3 font-mono text-gray-900">
                                    KSh {(Number(fine.amount) || 0).toFixed(2)}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        fine.isPaid
                                            ? 'bg-green-50 text-green-700'
                                            : 'bg-orange-50 text-orange-700'
                                    }`}>
                                        {fine.isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                    No fines yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}