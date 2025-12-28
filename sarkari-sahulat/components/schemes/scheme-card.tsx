'use client';

import { useLocale } from 'next-intl';
import { getLocalizedField } from '@/lib/utils/formatting';
import { Calendar, Users, Gift, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SchemeCardProps {
    scheme: any;
}

export function SchemeCard({ scheme }: SchemeCardProps) {
    const locale = useLocale();
    const isRTL = locale === 'ur';

    const title = getLocalizedField(scheme, 'title', locale);
    const description = getLocalizedField(scheme, 'description', locale);
    const benefits = getLocalizedField(scheme, 'benefits', locale);

    const isExpired = scheme.deadline && new Date(scheme.deadline) < new Date();
    const isActive = scheme.is_active && !isExpired;

    return (
        <Link
            href={`/${locale}/schemes/${scheme.id}`}
            className="block bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all p-6"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className={`font-semibold text-lg text-gray-900 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {title}
                    </h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded ${isActive
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                        {isActive
                            ? (locale === 'ur' ? 'فعال' : 'Active')
                            : (locale === 'ur' ? 'غیر فعال' : 'Inactive')}
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className={`text-sm text-gray-600 mb-4 line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {description}
            </p>

            {/* Benefits */}
            {benefits && (
                <div className={`flex gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Gift className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm text-gray-700 line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {benefits}
                    </p>
                </div>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                {scheme.category && (
                    <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Users className="w-4 h-4" />
                        <span>{scheme.category}</span>
                    </div>
                )}

                {scheme.deadline && (
                    <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Calendar className="w-4 h-4" />
                        <span>
                            {locale === 'ur' ? 'آخری تاریخ' : 'Deadline'}: {new Date(scheme.deadline).toLocaleDateString(locale === 'ur' ? 'ur-PK' : 'en-PK')}
                        </span>
                    </div>
                )}
            </div>

            {/* Department */}
            {scheme.department && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{scheme.department}</span>
                </div>
            )}
        </Link>
    );
}
