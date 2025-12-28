/**
 * Format currency in Pakistani Rupees
 */
export function formatCurrency(amount: number, locale: string = 'en'): string {
    if (locale === 'ur') {
        return `روپے ${amount.toLocaleString('ur-PK')}`;
    }
    return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Get localized field from an object
 */
export function getLocalizedField<T extends Record<string, any>>(
    obj: T,
    field: string,
    locale: string
): string {
    const urduField = `${field}_urdu`;
    if (locale === 'ur' && urduField in obj) {
        return obj[urduField] as string;
    }
    return obj[field] as string;
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, locale: string = 'en'): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (locale === 'ur') {
        return d.toLocaleDateString('ur-PK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return d.toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}
