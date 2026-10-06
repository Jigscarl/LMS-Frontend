import { api } from './client';
import type { Fine } from '../types/fine';

export const finesApi = {
    list: async (unpaidOnly = false): Promise<Fine[]> =>
        (await api.get('/api/fines', { params: { unpaidOnly } })).data,
    get: async (id: number): Promise<Fine> => (await api.get(`/api/fines/${id}`)).data,
    byMember: async (memberId: number): Promise<Fine[]> =>
        (await api.get(`/api/fines/member/${memberId}`)).data,
    pay: async (id: number): Promise<Fine> =>
        (await api.put(`/api/fines/${id}/pay`)).data,
};