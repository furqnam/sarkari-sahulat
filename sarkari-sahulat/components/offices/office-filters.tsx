'use client';

import { useLocale, useTranslations } from 'next-intl';
import { OFFICE_TYPES, MAJOR_CITIES } from '@/lib/constants';
import { Filter } from 'lucide-react';

interface OfficeFiltersProps {
    selectedType?: string;
    selectedCity?: string;
    onTypeChange: (type: string) => void;
    onCityChange: (city: string) => void;
}

export function OfficeFilters({
    selectedType,
    selectedCity,
    onTypeChange,
    onCityChange,
}: OfficeFiltersProps) {
    const locale = useLocale();
    const t = useTranslations();
    const isRTL = locale === 'ur';

    return (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">{t('common.filter')}</h3>
            </div>

            <div className="space-y-4">
                {/* Office Type Filter */}
                <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {locale === 'ur' ? 'دفتر کی قسم' : 'Office Type'}
                    </label>
                    <select
                        value={selectedType || ''}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${isRTL ? 'text-right' : 'text-left'
                            }`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <option value="">{locale === 'ur' ? 'تمام اقسام' : 'All Types'}</option>
                        {Object.entries(OFFICE_TYPES).map(([key, value]) => (
                            <option key={key} value={key}>
                                {locale === 'ur' ? value.label_urdu : value.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Filter */}
                <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {locale === 'ur' ? 'شہر' : 'City'}
                    </label>
                    <select
                        value={selectedCity || ''}
                        onChange={(e) => onCityChange(e.target.value)}
                        className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${isRTL ? 'text-right' : 'text-left'
                            }`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <option value="">{locale === 'ur' ? 'تمام شہر' : 'All Cities'}</option>
                        {MAJOR_CITIES.map((city) => (
                            <option key={city.value} value={city.label}>
                                {locale === 'ur' ? city.label_urdu : city.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters */}
                {(selectedType || selectedCity) && (
                    <button
                        onClick={() => {
                            onTypeChange('');
                            onCityChange('');
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {locale === 'ur' ? 'فلٹرز صاف کریں' : 'Clear Filters'}
                    </button>
                )}
            </div>
        </div>
    );
}
