import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '../api/books';
import type { CreateBookDto, UpdateBookDto } from '../types/book';

export const bookKeys = {
    all: ['books'] as const,
    detail: (id: number) => ['books', id] as const,
};

export function useBooks() {
    return useQuery({ queryKey: bookKeys.all, queryFn: booksApi.list });
}

export function useBook(id: number) {
    return useQuery({
        queryKey: bookKeys.detail(id),
        queryFn: () => booksApi.get(id),
        enabled: Number.isFinite(id),
    });
}

export function useCreateBook() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateBookDto) => booksApi.create(data),
        onSuccess: () => qc.invalidateQueries({ queryKey: bookKeys.all }),
    });
}

export function useUpdateBook(id: number) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateBookDto) => booksApi.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: bookKeys.all });
            qc.invalidateQueries({ queryKey: bookKeys.detail(id) });
        },
    });
}

export function useDeleteBook() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => booksApi.remove(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: bookKeys.all }),
    });
}