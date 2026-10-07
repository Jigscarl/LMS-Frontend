type IconProps = { className?: string };

export function BookIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}

export function UsersIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

export function LoanIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M9 9l3 3-3 3" />
        </svg>
    );
}

export function MoneyIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v12" />
            <path d="M15.5 9.5a3 3 0 0 0-3-1.5c-1.7 0-3 1-3 2.2 0 1.4 1.2 2 3 2.3 1.8.3 3 .9 3 2.3 0 1.2-1.3 2.2-3 2.2a3 3 0 0 1-3-1.5" />
        </svg>
    );
}

export function CheckCircleIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.5l2.5 2.5 4.5-5" />
        </svg>
    );
}

export function AlertIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l10 18H2L12 3z" />
            <path d="M12 10v4M12 18h.01" />
        </svg>
    );
}

export function PlusIcon({ className = 'w-4 h-4' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

export function ArrowRightIcon({ className = 'w-4 h-4' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={2}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
    );
}

export function LogoutIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 17l5-5-5-5M15 12H3" />
            <path d="M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6" />
        </svg>
    );
}

export function EyeIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

export function EyeOffIcon({ className = 'w-5 h-5' }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8}
             viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a17.4 17.4 0 0 1 4.22-5.19" />
            <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3.4 4.39" />
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M1 1l22 22" />
        </svg>
    );
}