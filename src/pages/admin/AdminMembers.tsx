import { Link } from 'react-router-dom';
import { useDeleteMember, useMembers } from '../../hooks/useMembers';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { PlusIcon } from '../../components/Icons';

export default function AdminMembers() {
    const { data: members, isLoading, error } = useMembers();
    const deleteMember = useDeleteMember();

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    const list = Array.isArray(members) ? members : [];

    return (
        <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Members</h1>
                    <p className="text-sm text-gray-500">{list.length} registered members</p>
                </div>
                <Link
                    to="/admin/members/new"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Member
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Name</th>
                            <th className="text-left px-4 py-3 font-medium">Email</th>
                            <th className="text-left px-4 py-3 font-medium">Membership #</th>
                            <th className="text-left px-4 py-3 font-medium">Status</th>
                            <th className="text-left px-4 py-3 font-medium">Active Loans</th>
                            <th className="text-right px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {list.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{member.fullName}</td>
                                <td className="px-4 py-3 text-gray-600">{member.email}</td>
                                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                                    {member.membershipNumber}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        member.isActive
                                            ? 'bg-green-50 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {member.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{member.activeLoans}</td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        type="button"
                                        disabled={deleteMember.isPending}
                                        onClick={() => {
                                            if (window.confirm(`Delete ${member.fullName}? Their linked login will also be deleted. Members with loan history cannot be deleted.`)) {
                                                deleteMember.mutate(member.id);
                                            }
                                        }}
                                        className="rounded-md px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {deleteMember.isPending && deleteMember.variables === member.id ? 'Deleting…' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    No members yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {deleteMember.error && (
                <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {(deleteMember.error as Error).message}
                </p>
            )}
        </div>
    );
}