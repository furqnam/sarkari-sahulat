import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getServiceBySlug, getRelatedServices } from '@/lib/supabase/queries';
import { ServiceCard } from '@/components/services/service-card';
import { getLocalizedField, formatCurrency } from '@/lib/utils/formatting';
import { ArrowLeft, Clock, DollarSign, FileText, ExternalLink, MapPin, Calculator, CheckSquare } from 'lucide-react';
import Link from 'next/link';

interface ServiceDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const { slug } = await params;
    const t = useTranslations();
    const locale = useLocale();
    const isRTL = locale === 'ur';

    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const name = getLocalizedField(service, 'name', locale);
    const description = getLocalizedField(service, 'description', locale);
    const howToApply = getLocalizedField(service, 'how_to_apply', locale);

    // Get related services
    const relatedServices = service.category_id
        ? await getRelatedServices(service.id, service.category_id)
        : [];

    // Parse requirements and fees
    const requirements = service.requirements as any[];
    const fees = service.fees as any;
    const urgencyOptions = service.urgency_options as any[];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <Link
                        href={`/${locale}/services`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('common.back') || 'Back'}
                    </Link>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {name}
                            </h1>
                            <p className={`text-gray-600 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {description}
                            </p>

                            {/* Metadata */}
                            <div className="flex flex-wrap gap-4 text-sm">
                                {service.processing_time && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{service.processing_time}</span>
                                    </div>
                                )}

                                {service.department && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FileText className="w-4 h-4" />
                                        <span>{service.department}</span>
                                    </div>
                                )}

                                {service.is_online_available && (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <ExternalLink className="w-4 h-4" />
                                        <span>{locale === 'ur' ? 'آن لائن دستیاب' : 'Available Online'}</span>
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
                        {/* Requirements */}
                        <div className="bg-white rounded-lg p-6">
                            <h2 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('services.requirements')}
                            </h2>
                            <ul className="space-y-3">
                                {requirements.map((req, index) => (
                                    <li key={index} className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className={isRTL ? 'text-right' : 'text-left'}>
                                            {locale === 'ur' ? req.text_urdu : req.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Fees */}
                        <div className="bg-white rounded-lg p-6">
                            <h2 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('services.fees')}
                            </h2>

                            <div className="space-y-3">
                                {fees.normal && (
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-gray-600">{locale === 'ur' ? 'عام' : 'Normal'}</span>
                                        <span className="font-semibold">{formatCurrency(fees.normal, locale)}</span>
                                    </div>
                                )}

                                {fees.urgent && (
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-gray-600">{locale === 'ur' ? 'فوری' : 'Urgent'}</span>
                                        <span className="font-semibold">{formatCurrency(fees.urgent, locale)}</span>
                                    </div>
                                )}

                                {fees.executive && (
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="text-gray-600">{locale === 'ur' ? 'ایگزیکٹو' : 'Executive'}</span>
                                        <span className="font-semibold">{formatCurrency(fees.executive, locale)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* How to Apply */}
                        {howToApply && (
                            <div className="bg-white rounded-lg p-6">
                                <h2 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {t('services.howToApply')}
                                </h2>
                                <p className={`text-gray-700 whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {howToApply}
                                </p>

                                {service.online_portal_url && (
                                    <a
                                        href={service.online_portal_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 text-green-600 hover:text-green-700"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {locale === 'ur' ? 'آن لائن پورٹل' : 'Visit Online Portal'}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg p-6">
                            <h3 className="font-semibold mb-4">{locale === 'ur' ? 'فوری اقدامات' : 'Quick Actions'}</h3>
                            <div className="space-y-3">
                                <Link
                                    href={`/${locale}/offices`}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <MapPin className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">{t('offices.findNearest')}</span>
                                </Link>

                                <Link
                                    href={`/${locale}/tools/calculator`}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <Calculator className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">{t('tools.calculator.title')}</span>
                                </Link>

                                <Link
                                    href={`/${locale}/tools/checklist`}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <CheckSquare className="w-5 h-5 text-green-600" />
                                    <span className="text-sm">{t('tools.checklist.title')}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Related Services */}
                        {relatedServices.length > 0 && (
                            <div className="bg-white rounded-lg p-6">
                                <h3 className="font-semibold mb-4">
                                    {locale === 'ur' ? 'متعلقہ خدمات' : 'Related Services'}
                                </h3>
                                <div className="space-y-3">
                                    {relatedServices.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={`/${locale}/services/${related.slug}`}
                                            className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <p className="text-sm font-medium">
                                                {getLocalizedField(related, 'name', locale)}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
