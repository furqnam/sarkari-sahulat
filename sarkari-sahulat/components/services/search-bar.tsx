'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    initialValue?: string;
    onSearch?: (query: string) => void;
    placeholder?: string;
}

export function SearchBar({ initialValue = '', onSearch, placeholder }: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations();
    const isRTL = locale === 'ur';

    const defaultPlaceholder = placeholder || t('services.searchPlaceholder');

    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (onSearch) {
            onSearch(query);
        } else {
            // Navigate to services page with search query
            const params = new URLSearchParams();
            if (query.trim()) {
                params.set('q', query.trim());
            }
            router.push(`/${locale}/services?${params.toString()}`);
        }
    };

    const handleClear = () => {
        setQuery('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
                <div className={`absolute inset-y-0 flex items-center pointer-events-none ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'}`}>
                    <Search className="w-5 h-5 text-gray-400" />
                </div>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={defaultPlaceholder}
                    className={`w-full border border-gray-300 rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10'
                        }`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                />

                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={`absolute inset-y-0 flex items-center ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'}`}
                    >
                        <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>
        </form>
    );
}
