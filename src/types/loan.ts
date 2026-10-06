export interface Loan {
    id: number;
    bookId: number;
    bookTitle: string;
    memberId: number;
    memberName: string;
    borrowedOn: string;
    dueOn: string;
    returnedOn: string | null;
    isOverdue: boolean;
    fineAmount: number | null;
    fineIsPaid: boolean | null;
}

export interface BorrowDto {
    bookId: number;
    memberId: number;
}