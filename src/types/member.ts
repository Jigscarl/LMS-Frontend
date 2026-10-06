export interface Member {
    id: number;
    fullName: string;
    email: string;
    membershipNumber: string;
    joinedOn: string;
    isActive: boolean;
    activeLoans: number;
}

export interface CreateMemberDto {
    fullName: string;
    email: string;
    membershipNumber: string;
}