export interface Fine {
    id: number;
    loanId: number;
    memberId: number;
    memberName: string;
    bookTitle: string;
    amount: number;
    isPaid: boolean;
    borrowedOn: string;
    dueOn: string;
    returnedOn: string | null;
}