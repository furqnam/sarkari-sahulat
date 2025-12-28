import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { getServiceCategories, getServices } from '@/lib/supabase/queries';
import { CategoryGrid } from '@/components/services/category-grid';
import { ServiceCard } from '@/components/services/service-card';
import { SearchBar } from '@/components/services/search-bar';
import { Loader2 } from 'lucide-react';

interface ServicesPageProps {
    searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
    const params = await searchParams;
    const t = useTranslations();

    // Fetch categories and services
    const [categories, servicesData] = await Promise.all([
        getServiceCategories(),
        getServices({
            search: params.q,
            categoryId: params.category,
            limit: 50,
        }),
    ]);

    const { services, total } = servicesData;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('services.title')}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        {t('services.browse')} - {total} {t('services.title').toLowerCase()}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl">
                        <SearchBar initialValue={params.q} />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Show search results or categories */}
                {params.q ? (
                    // Search Results
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            {total} {t('common.search')} {t('common.viewDetails')}
                        </h2>

                        {services.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">{t('services.noResults')}</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    // Browse by Categories
                    <div>
                        <h2 className="text-xl font-semibold mb-6">{t('services.categories')}</h2>
                        <CategoryGrid categories={categories} />

                        {/* Popular Services */}
                        <div className="mt-12">
                            <h2 className="text-xl font-semibold mb-6">
                                {t('services.browse')}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {services.slice(0, 6).map((service) => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Loading state
export function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
    );
}
