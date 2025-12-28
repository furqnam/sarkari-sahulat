import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getSchemeById } from '@/lib/supabase/scheme-queries';
import { getLocalizedField } from '@/lib/utils/formatting';
import { ArrowLeft, Gift, Users, Calendar, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface SchemeDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function SchemeDetailPage({ params }: SchemeDetailPageProps) {
    const { id } = await params;
    const t = useTranslations();
    const locale = useLocale();
    const isRTL = locale === 'ur';

    const scheme = await getSchemeById(id);

    if (!scheme) {
        notFound();
    }

    const title = getLocalizedField(scheme, 'title', locale);
    const description = getLocalizedField(scheme, 'description', locale);
    const benefits = getLocalizedField(scheme, 'benefits', locale);
    const howToApply = getLocalizedField(scheme, 'how_to_apply', locale);

    const eligibilityCriteria = scheme.eligibility_criteria as any[] || [];
    const isExpired = scheme.deadline && new Date(scheme.deadline) < new Date();
    const isActive = scheme.is_active && !isExpired;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <Link
                        href={`/${locale}/schemes`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('common.back')}
                    </Link>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {title}
                            </h1>

                            <div className="flex flex-wrap gap-3 items-center">
                                <span className={`inline-block px-3 py-1 text-sm rounded ${isActive
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {isActive
                                        ? (locale === 'ur' ? 'فعال' : 'Active')
                                        : (locale === 'ur' ? 'غیر فعال' : 'Inactive')}
                                </span>

                                {scheme.category && (
                                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded">
                                        {scheme.category}
                                    </span>
                                )}

                                {scheme.deadline && (
                                    <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {locale === 'ur' ? 'آخری تاریخ' : 'Deadline'}: {new Date(scheme.deadline).toLocaleDateString(locale === 'ur' ? 'ur-PK' : 'en-PK')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-lg p-6">
                            <h2 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {locale === 'ur' ? 'تفصیل' : 'Description'}
                            </h2>
                            <p className={`text-gray-700 whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                                {description}
                            </p>
                        </div>

                        {/* Eligibility Criteria */}
                        {eligibilityCriteria.length > 0 && (
                            <div className="bg-white rounded-lg p-6">
                                <h2 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('schemes.eligibility')}
                                </h2>
                                <ul className="space-y-3">
                                    {eligibilityCriteria.map((criteria, index) => (
                                        <li key={index} className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className={isRTL ? 'text-right' : 'text-left'}>
                                                {locale === 'ur' ? criteria.text_urdu : criteria.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Benefits */}
                        {benefits && (
                            <div className="bg-white rounded-lg p-6">
                                <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <Gift className="w-6 h-6 text-green-600" />
                                    <h2 className="text-xl font-semibold">{t('schemes.benefits')}</h2>
                                </div>
                                <p className={`text-gray-700 whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {benefits}
                                </p>
                            </div>
                        )}

                        {/* How to Apply */}
                        {howToApply && (
                            <div className="bg-white rounded-lg p-6">
                                <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <FileText className="w-6 h-6 text-green-600" />
                                    <h2 className="text-xl font-semibold">
                                        {locale === 'ur' ? 'کیسے درخواست دیں' : 'How to Apply'}
                                    </h2>
                                </div>
                                <p className={`text-gray-700 whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {howToApply}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Department Info */}
                        {scheme.department && (
                            <div className="bg-white rounded-lg p-6">
                                <h3 className={`font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {locale === 'ur' ? 'محکمہ' : 'Department'}
                                </h3>
                                <p className={`text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {scheme.department}
                                </p>
                            </div>
                        )}

                        {/* Quick Info */}
                        <div className="bg-white rounded-lg p-6">
                            <h3 className={`font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {locale === 'ur' ? 'فوری معلومات' : 'Quick Info'}
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-600">
                                        {locale === 'ur' ? 'حیثیت' : 'Status'}:
                                    </span>
                                    <span className={`ml-2 font-medium ${isActive ? 'text-green-600' : 'text-gray-600'}`}>
                                        {isActive
                                            ? (locale === 'ur' ? 'فعال' : 'Active')
                                            : (locale === 'ur' ? 'غیر فعال' : 'Inactive')}
                                    </span>
                                </div>

                                {scheme.category && (
                                    <div>
                                        <span className="text-gray-600">
                                            {locale === 'ur' ? 'زمرہ' : 'Category'}:
                                        </span>
                                        <span className="ml-2 font-medium">{scheme.category}</span>
                                    </div>
                                )}

                                {scheme.deadline && (
                                    <div>
                                        <span className="text-gray-600">
                                            {locale === 'ur' ? 'آخری تاریخ' : 'Deadline'}:
                                        </span>
                                        <span className="ml-2 font-medium">
                                            {new Date(scheme.deadline).toLocaleDateString(locale === 'ur' ? 'ur-PK' : 'en-PK', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
