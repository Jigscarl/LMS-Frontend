import { api } from './client';
import type { CatalogEntry, CreateCatalogEntryDto } from '../types/catalog';

export const catalogApi = {
    categories: async (): Promise<CatalogEntry[]> => (await api.get('/api/categories')).data,
    authors: async (): Promise<CatalogEntry[]> => (await api.get('/api/authors')).data,
    createCategory: async (data: CreateCatalogEntryDto): Promise<CatalogEntry> =>
        (await api.post('/api/categories', data)).data,
    createAuthor: async (data: CreateCatalogEntryDto): Promise<CatalogEntry> =>
        (await api.post('/api/authors', data)).data,
};