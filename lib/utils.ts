import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistance, formatRelative } from "date-fns"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return format(d, 'MMM dd, yyyy')
}

export function formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return format(d, 'MMM dd, yyyy HH:mm')
}

export function formatRelativeDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return formatDistance(d, new Date(), { addSuffix: true })
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function generateId(): string {
    return Math.random().toString(36).substring(2, 15)
}
