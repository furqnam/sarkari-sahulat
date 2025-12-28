'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getServices } from '@/lib/supabase/queries';
import { Service } from '@/types/service';
import { getLocalizedField } from '@/lib/utils/formatting';
import { CheckSquare, Square, Download, Printer } from 'lucide-react';

export default function ChecklistPage() {
    const t = useTranslations();
    const locale = useLocale();
    const isRTL = locale === 'ur';

    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
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

    // Reset checklist when service changes
    useEffect(() => {
        setCheckedItems({});
    }, [selectedService]);

    const requirements = selectedService?.requirements as any[] || [];
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progress = requirements.length > 0 ? (checkedCount / requirements.length) * 100 : 0;

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        if (!selectedService) return;

        const serviceName = getLocalizedField(selectedService, 'name', locale);
        const content = `${serviceName} - ${locale === 'ur' ? 'دستاویزات کی فہرست' : 'Document Checklist'}\n\n${requirements.map((req, index) =>
            `${index + 1}. ${locale === 'ur' ? req.text_urdu : req.text}`
        ).join('\n')
            }`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${serviceName.replace(/\s+/g, '_')}_checklist.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b print:hidden">
                <div className="container mx-auto px-4 py-8">
                    <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <CheckSquare className="w-8 h-8 text-green-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {t('tools.checklist.title')}
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        {locale === 'ur'
                            ? 'سرکاری خدمات کے لیے ضروری دستاویزات کی فہرست بنائیں'
                            : 'Generate required documents checklist for government services'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Service Selection */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:hidden">
                        <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {t('tools.checklist.selectService')}
                        </label>
                        <select
                            value={selectedService?.id || ''}
                            onChange={(e) => {
                                const service = services.find(s => s.id === e.target.value);
                                setSelectedService(service || null);
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
                            {/* Progress Bar */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6 print:hidden">
                                <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <span className="text-sm font-medium text-gray-700">
                                        {locale === 'ur' ? 'پیش رفت' : 'Progress'}
                                    </span>
                                    <span className="text-sm font-medium text-green-600">
                                        {checkedCount} / {requirements.length}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-green-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="bg-white rounded-lg shadow-md p-6 print:shadow-none">
                                {/* Print Header */}
                                <div className="hidden print:block mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {getLocalizedField(selectedService, 'name', locale)}
                                    </h2>
                                    <p className="text-gray-600">
                                        {locale === 'ur' ? 'دستاویزات کی فہرست' : 'Document Checklist'}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className={`flex gap-3 mb-6 print:hidden ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <button
                                        onClick={handlePrint}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <Printer className="w-4 h-4" />
                                        {locale === 'ur' ? 'پرنٹ کریں' : 'Print'}
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        {locale === 'ur' ? 'ڈاؤن لوڈ کریں' : 'Download'}
                                    </button>
                                </div>

                                {/* Requirements List */}
                                <div className="space-y-3">
                                    {requirements.map((req, index) => (
                                        <label
                                            key={index}
                                            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors print:border-gray-300 ${checkedItems[index]
                                                    ? 'border-green-500 bg-green-50 print:bg-white'
                                                    : 'border-gray-200 hover:border-green-300 print:hover:border-gray-300'
                                                } ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                                        >
                                            <div className="flex-shrink-0 mt-0.5 print:hidden">
                                                {checkedItems[index] ? (
                                                    <CheckSquare className="w-6 h-6 text-green-600" />
                                                ) : (
                                                    <Square className="w-6 h-6 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="hidden print:block flex-shrink-0 mt-0.5">
                                                <Square className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={checkedItems[index] || false}
                                                onChange={(e) => {
                                                    setCheckedItems({
                                                        ...checkedItems,
                                                        [index]: e.target.checked,
                                                    });
                                                }}
                                                className="hidden"
                                            />
                                            <div className="flex-1">
                                                <p className={`font-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                                                    {locale === 'ur' ? req.text_urdu : req.text}
                                                </p>
                                                {req.type && (
                                                    <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                        {req.type}
                                                    </span>
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {/* Additional Info */}
                                {selectedService.how_to_apply && (
                                    <div className="mt-6 pt-6 border-t print:border-gray-300">
                                        <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {locale === 'ur' ? 'کیسے درخواست دیں' : 'How to Apply'}
                                        </h3>
                                        <p className={`text-gray-700 whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                                            {getLocalizedField(selectedService, 'how_to_apply', locale)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {!selectedService && !loading && (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
                            {locale === 'ur'
                                ? 'فہرست بنانے کے لیے خدمت منتخب کریں'
                                : 'Select a service to generate checklist'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
