'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Clock, DollarSign, Globe, ExternalLink } from 'lucide-react';
import { Service } from '@/types/service';
import { getLocalizedField, formatCurrency } from '@/lib/utils/formatting';

interface ServiceCardProps {
    service: Service;
    variant?: 'grid' | 'list';
}

export function ServiceCard({ service, variant = 'grid' }: ServiceCardProps) {
    const locale = useLocale();
    const isRTL = locale === 'ur';

    const name = getLocalizedField(service, 'name', locale);
    const description = getLocalizedField(service, 'description', locale);

    // Get fee information
    const fees = service.fees as any;
    const minFee = fees.normal || fees.registration || fees.application || 0;

    return (
        <Link
            href={`/${locale}/services/${service.slug}`}
            className={`block bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all ${variant === 'list' ? 'p-4' : 'p-6'
                }`}
        >
            <div className={variant === 'list' ? 'flex gap-4' : ''}>
                {/* Content */}
                <div className="flex-1">
                    <h3 className={`font-semibold text-gray-900 mb-2 ${variant === 'grid' ? 'text-lg' : 'text-base'} ${isRTL ? 'text-right' : 'text-left'}`}>
                        {name}
                    </h3>

                    <p className={`text-sm text-gray-600 mb-4 line-clamp-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {description}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 text-xs">
                        {/* Fee */}
                        {minFee > 0 && (
                            <div className="flex items-center gap-1 text-gray-600">
                                <DollarSign className="w-4 h-4" />
                                <span>{formatCurrency(minFee, locale)}</span>
                            </div>
                        )}

                        {/* Processing Time */}
                        {service.processing_time && (
                            <div className="flex items-center gap-1 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{service.processing_time}</span>
                            </div>
                        )}

                        {/* Online Available */}
                        {service.is_online_available && (
                            <div className="flex items-center gap-1 text-green-600">
                                <Globe className="w-4 h-4" />
                                <span>{locale === 'ur' ? 'آن لائن دستیاب' : 'Online'}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Arrow Icon */}
                <div className={`flex items-center ${variant === 'grid' ? 'mt-4' : ''}`}>
                    <ExternalLink className={`w-5 h-5 text-gray-400 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Department Badge */}
            {service.department && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                        {service.department}
                    </span>
                </div>
            )}
        </Link>
    );
}
