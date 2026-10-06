import { api } from './client';
import type { Book, CreateBookDto, UpdateBookDto } from '../types/book';

export const booksApi = {
    list: async (): Promise<Book[]> => (await api.get('/api/books')).data,
    get: async (id: number): Promise<Book> => (await api.get(`/api/books/${id}`)).data,
    create: async (data: CreateBookDto): Promise<Book> =>
        (await api.post('/api/books', data)).data,
    update: async (id: number, data: UpdateBookDto): Promise<Book> =>
        (await api.put(`/api/books/${id}`, data)).data,
    remove: async (id: number): Promise<void> => {
        await api.delete(`/api/books/${id}`);
    },
};