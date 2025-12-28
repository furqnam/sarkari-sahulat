'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getServices } from '@/lib/supabase/queries';
import { Service } from '@/types/service';
import { getLocalizedField, formatCurrency } from '@/lib/utils/formatting';
import { Calculator, DollarSign } from 'lucide-react';

export default function FeeCalculatorPage() {
    const t = useTranslations();
    const locale = useLocale();
    const isRTL = locale === 'ur';

    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [urgencyType, setUrgencyType] = useState<string>('normal');
    const [additionalFees, setAdditionalFees] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(true);

    // Fetch services
    useEffect(() => {
        async function fetchServices() {
            try {
                const { services: data } = await getServices({ limit: 100 });
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, []);

    // Calculate total fee
    const calculateTotal = (): number => {
        if (!selectedService) return 0;

        const fees = selectedService.fees as any;
        let total = 0;

        // Base fee based on urgency
        if (urgencyType === 'normal' && fees.normal) {
            total += fees.normal;
        } else if (urgencyType === 'urgent' && fees.urgent) {
            total += fees.urgent;
        } else if (urgencyType === 'executive' && fees.executive) {
            total += fees.executive;
        } else if (urgencyType === 'fast_track' && fees.fast_track) {
            total += fees.fast_track;
        }

        // Additional fees
        if (fees.additional_fees) {
            fees.additional_fees.forEach((fee: any) => {
                if (additionalFees[fee.name]) {
                    total += fee.amount;
                }
            });
        }

        return total;
    };

    const total = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Calculator className="w-8 h-8 text-green-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {t('tools.calculator.title')}
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        {locale === 'ur'
                            ? 'سرکاری خدمات کے لیے کل فیس کا حساب لگائیں'
                            : 'Calculate total fees for government services'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* Service Selection */}
                        <div className="mb-6">
                            <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('tools.calculator.selectService')}
                            </label>
                            <select
                                value={selectedService?.id || ''}
                                onChange={(e) => {
                                    const service = services.find(s => s.id === e.target.value);
                                    setSelectedService(service || null);
                                    setUrgencyType('normal');
                                    setAdditionalFees({});
                                }}
                                className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${isRTL ? 'text-right' : 'text-left'
                                    }`}
                                dir={isRTL ? 'rtl' : 'ltr'}
                            >
                                <option value="">
                                    {locale === 'ur' ? 'خدمت منتخب کریں' : 'Select a service'}
                                </option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {getLocalizedField(service, 'name', locale)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedService && (
                            <>
                                {/* Urgency Selection */}
                                <div className="mb-6">
                                    <label className={`block text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                                        {t('tools.calculator.urgency')}
                                    </label>
                                    <div className="space-y-2">
                                        {Object.entries(selectedService.fees as any).map(([key, value]) => {
                                            if (key === 'currency' || key === 'additional_fees' || typeof value !== 'number') return null;

                                            return (
                                                <label
                                                    key={key}
                                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${urgencyType === key
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-gray-200 hover:border-green-300'
                                                        } ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="urgency"
                                                        value={key}
                                                        checked={urgencyType === key}
                                                        onChange={(e) => setUrgencyType(e.target.value)}
                                                        className="w-4 h-4 text-green-600"
                                                    />
                                                    <div className={`flex-1 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                                        <span className="font-medium capitalize">
                                                            {key.replace('_', ' ')}
                                                        </span>
                                                        <span className="text-green-600 font-semibold">
                                                            {formatCurrency(value as number, locale)}
                                                        </span>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Additional Fees */}
                                {(selectedService.fees as any).additional_fees && (
                                    <div className="mb-6">
                                        <label className={`block text-sm font-medium text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {locale === 'ur' ? 'اضافی فیس' : 'Additional Fees'}
                                        </label>
                                        <div className="space-y-2">
                                            {(selectedService.fees as any).additional_fees.map((fee: any) => (
                                                <label
                                                    key={fee.name}
                                                    className={`flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300 ${isRTL ? 'flex-row-reverse' : 'flex-row'
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={additionalFees[fee.name] || false}
                                                        onChange={(e) => {
                                                            setAdditionalFees({
                                                                ...additionalFees,
                                                                [fee.name]: e.target.checked,
                                                            });
                                                        }}
                                                        className="w-4 h-4 text-green-600 rounded"
                                                    />
                                                    <div className={`flex-1 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                                        <span>
                                                            {locale === 'ur' ? fee.name_urdu : fee.name}
                                                            {fee.optional && (
                                                                <span className="text-gray-500 text-sm ml-2">
                                                                    ({locale === 'ur' ? 'اختیاری' : 'Optional'})
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className="text-gray-600">
                                                            {formatCurrency(fee.amount, locale)}
                                                        </span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Total */}
                                <div className="border-t pt-6">
                                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                            <span className="text-xl font-semibold text-gray-900">
                                                {t('tools.calculator.total')}
                                            </span>
                                        </div>
                                        <span className="text-3xl font-bold text-green-600">
                                            {formatCurrency(total, locale)}
                                        </span>
                                    </div>

                                    {/* Processing Time */}
                                    {selectedService.processing_time && (
                                        <p className={`text-sm text-gray-600 mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {locale === 'ur' ? 'پروسیسنگ کا وقت' : 'Processing Time'}: {selectedService.processing_time}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {!selectedService && !loading && (
                            <div className="text-center py-12 text-gray-500">
                                {locale === 'ur'
                                    ? 'فیس کا حساب لگانے کے لیے خدمت منتخب کریں'
                                    : 'Select a service to calculate fees'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
