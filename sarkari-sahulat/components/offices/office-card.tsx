'use client';

import { useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Globe, Clock, Navigation } from 'lucide-react';
import { Office } from '@/types/office';
import { formatDistance } from '@/lib/utils/distance';
import { OFFICE_TYPES } from '@/lib/constants';

interface OfficeCardProps {
    office: Office;
    onSelect?: () => void;
    isSelected?: boolean;
}

export function OfficeCard({ office, onSelect, isSelected }: OfficeCardProps) {
    const locale = useLocale();
    const isRTL = locale === 'ur';

    const officeType = OFFICE_TYPES[office.type as keyof typeof OFFICE_TYPES];
    const typeName = locale === 'ur' ? officeType?.label_urdu : officeType?.label;

    const handleGetDirections = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${office.latitude},${office.longitude}`;
        window.open(url, '_blank');
    };

    return (
        <div
            className={`bg-white rounded-lg border p-4 transition-all cursor-pointer ${isSelected ? 'border-green-500 shadow-lg' : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                }`}
            onClick={onSelect}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className={`font-semibold text-gray-900 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {office.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                        {typeName}
                    </span>
                </div>

                {office.distance !== undefined && (
                    <div className="text-sm font-medium text-green-600">
                        {formatDistance(office.distance)}
                    </div>
                )}
            </div>

            {/* Address */}
            <div className={`flex gap-2 text-sm text-gray-600 mb-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className={isRTL ? 'text-right' : 'text-left'}>{office.address}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-3">
                {office.phone && (
                    <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${office.phone}`} className="hover:text-green-600">
                            {office.phone}
                        </a>
                    </div>
                )}

                {office.email && (
                    <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${office.email}`} className="hover:text-green-600">
                            {office.email}
                        </a>
                    </div>
                )}

                {office.website && (
                    <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Globe className="w-4 h-4" />
                        <a
                            href={office.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-600 truncate"
                        >
                            {locale === 'ur' ? 'ویب سائٹ' : 'Website'}
                        </a>
                    </div>
                )}
            </div>

            {/* Timings */}
            {office.timings && (
                <div className={`flex items-start gap-2 text-sm text-gray-600 mb-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                        {getTodayTimings(office.timings)}
                    </div>
                </div>
            )}

            {/* Get Directions Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleGetDirections();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
                <Navigation className="w-4 h-4" />
                {locale === 'ur' ? 'سمت حاصل کریں' : 'Get Directions'}
            </button>
        </div>
    );
}

function getTodayTimings(timings: any): string {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return timings[today] || 'Closed';
}
