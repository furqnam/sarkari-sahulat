import { useTranslations, useLocale } from 'next-intl';
import { getGovernmentSchemes } from '@/lib/supabase/scheme-queries';
import { SchemeCard } from '@/components/schemes/scheme-card';
import { Gift } from 'lucide-react';

export default async function SchemesPage() {
    const t = useTranslations();
    const locale = useLocale();

    const schemes = await getGovernmentSchemes({ isActive: true, limit: 50 });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className={`flex items-center gap-3 mb-2 ${locale === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Gift className="w-8 h-8 text-green-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {t('schemes.title')}
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        {schemes.length} {locale === 'ur' ? 'فعال اسکیمیں' : 'active schemes'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {schemes.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-gray-500">
                            {locale === 'ur' ? 'کوئی اسکیم نہیں ملی' : 'No schemes found'}
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schemes.map((scheme) => (
                            <SchemeCard key={scheme.id} scheme={scheme} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
