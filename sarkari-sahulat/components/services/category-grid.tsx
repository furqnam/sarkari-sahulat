'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import * as Icons from 'lucide-react';
import { ServiceCategory } from '@/types/service';
import { getLocalizedField } from '@/lib/utils/formatting';

interface CategoryGridProps {
    categories: ServiceCategory[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    const locale = useLocale();
    const isRTL = locale === 'ur';

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
                const name = getLocalizedField(category, 'name', locale);
                const description = getLocalizedField(category, 'description', locale);

                // Get icon component
                const IconComponent = category.icon && (Icons as any)[category.icon]
                    ? (Icons as any)[category.icon]
                    : Icons.FileText;

                return (
                    <Link
                        key={category.id}
                        href={`/${locale}/services/category/${category.slug}`}
                        className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                            <IconComponent className="w-6 h-6 text-green-600" />
                        </div>

                        <h3 className={`font-semibold text-sm text-gray-900 text-center mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {name}
                        </h3>

                        {description && (
                            <p className={`text-xs text-gray-500 text-center line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {description}
                            </p>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
