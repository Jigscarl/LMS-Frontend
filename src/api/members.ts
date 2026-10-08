import { api } from './client';
import type { Member, CreateMemberDto } from '../types/member';

export const membersApi = {
    list: async (): Promise<Member[]> => (await api.get('/api/members')).data,
    get: async (id: number): Promise<Member> => (await api.get(`/api/members/${id}`)).data,
    create: async (data: CreateMemberDto): Promise<Member> =>
        (await api.post('/api/members', data)).data,
    remove: async (id: number): Promise<void> => {
        await api.delete(`/api/members/${id}`);
    },
};