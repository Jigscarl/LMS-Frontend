import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { membersApi } from '../api/members';
import type { CreateMemberDto } from '../types/member';

export const memberKeys = {
    all: ['members'] as const,
    detail: (id: number) => ['members', id] as const,
};

export function useMembers() {
    return useQuery({ queryKey: memberKeys.all, queryFn: membersApi.list });
}

export function useMember(id: number) {
    return useQuery({
        queryKey: memberKeys.detail(id),
        queryFn: () => membersApi.get(id),
        enabled: Number.isFinite(id),
    });
}

export function useCreateMember() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateMemberDto) => membersApi.create(data),
        onSuccess: () => qc.invalidateQueries({ queryKey: memberKeys.all }),
    });
}