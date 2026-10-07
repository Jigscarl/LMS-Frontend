import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { catalogApi } from '../api/catalog';
import type { CreateCatalogEntryDto } from '../types/catalog';

export const catalogKeys = {
    categories: ['categories'] as const,
    authors: ['authors'] as const,
};

export function useCategories() {
    return useQuery({ queryKey: catalogKeys.categories, queryFn: catalogApi.categories });
}

export function useAuthors() {
    return useQuery({ queryKey: catalogKeys.authors, queryFn: catalogApi.authors });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCatalogEntryDto) => catalogApi.createCategory(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: catalogKeys.categories }),
    });
}

export function useCreateAuthor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCatalogEntryDto) => catalogApi.createAuthor(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: catalogKeys.authors }),
    });
}