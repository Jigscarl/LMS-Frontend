import { api } from './client';
import type { Loan, BorrowDto } from '../types/loan';

export const loansApi = {
    list: async (): Promise<Loan[]> => (await api.get('/api/loans')).data,
    mine: async (): Promise<Loan[]> => (await api.get('/api/loans/mine')).data,
    get: async (id: number): Promise<Loan> => (await api.get(`/api/loans/${id}`)).data,
    borrow: async (data: BorrowDto): Promise<Loan> =>
        (await api.post('/api/loans/borrow', data)).data,
    return: async (id: number): Promise<Loan> =>
        (await api.post(`/api/loans/${id}/return`)).data,
};