export interface Book {
    id: number;
    title: string;
    isbn: string;
    publishedYear: number;
    totalCopies: number;
    availableCopies: number;
    category: string;
    authors: string[];
}

export interface CreateBookDto {
    title: string;
    isbn: string;
    publishedYear: number;
    totalCopies: number;
    categoryId: number;
    authorIds: number[];
}

export interface UpdateBookDto {
    title: string;
    isbn: string;
    publishedYear: number;
    totalCopies: number;
    categoryId: number;
}