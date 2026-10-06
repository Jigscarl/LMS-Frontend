import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { finesApi } from '../api/fines';

export function useFines(unpaidOnly = false) {
    return useQuery({
        queryKey: ['fines', { unpaidOnly }],
        queryFn: () => finesApi.list(unpaidOnly),
    });
}

export function useFinesByMember(memberId: number) {
    return useQuery({
        queryKey: ['fines', 'member', memberId],
        queryFn: () => finesApi.byMember(memberId),
        enabled: Number.isFinite(memberId),
    });
}

export function usePayFine() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => finesApi.pay(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['fines'] }),
    });
}