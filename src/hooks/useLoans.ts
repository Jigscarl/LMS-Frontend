import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loansApi } from '../api/loans';
import type { BorrowDto } from '../types/loan';

export function useLoans() {
    return useQuery({ queryKey: ['loans'], queryFn: loansApi.list });
}

export function useBorrow() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: BorrowDto) => loansApi.borrow(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['loans'] });
            qc.invalidateQueries({ queryKey: ['books'] });
        },
    });
}

export function useReturn() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => loansApi.return(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['loans'] });
            qc.invalidateQueries({ queryKey: ['books'] });
            qc.invalidateQueries({ queryKey: ['fines'] });
        },
    });
}