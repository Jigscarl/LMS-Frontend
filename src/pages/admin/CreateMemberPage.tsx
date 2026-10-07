import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '../../components/Icons';
import { useCreateMember } from '../../hooks/useMembers';

export default function CreateMemberPage() {
    const navigate = useNavigate();
    const createMember = useCreateMember();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createMember.mutate({
            fullName: fullName.trim(),
            email: email.trim(),
            membershipNumber: membershipNumber.trim(),
        }, {
            onSuccess: () => navigate('/admin/members'),
        });
    };

    return (
        <div className="mx-auto max-w-2xl">
            <Link to="/admin/members" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800">
                <span aria-hidden="true">←</span> Back to members
            </Link>
            <div className="mb-6 mt-4">
                <h1 className="text-2xl font-bold text-gray-900">Add a member</h1>
                <p className="mt-1 text-sm text-gray-500">Create a library member profile.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <label className="block text-sm font-medium text-gray-700">
                    Full name
                    <input required maxLength={120} autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                    Email address
                    <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                    Membership number
                    <input required maxLength={60} value={membershipNumber} onChange={(event) => setMembershipNumber(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </label>

                {createMember.isError && (
                    <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {(createMember.error as Error).message}
                    </p>
                )}

                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
                    <Link to="/admin/members" className="inline-flex min-h-10 items-center rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</Link>
                    <button type="submit" disabled={createMember.isPending} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300">
                        {createMember.isPending ? 'Adding member…' : 'Add member'}
                        {!createMember.isPending && <ArrowRightIcon className="h-4 w-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
}