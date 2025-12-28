import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getServicesByCategory, getServiceCategories } from '@/lib/supabase/queries';
import { ServiceCard } from '@/components/services/service-card';
import { SearchBar } from '@/components/services/search-bar';
import { getLocalizedField } from '@/lib/utils/formatting';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const t = useTranslations();
    const locale = useLocale();

    // Fetch category and services
    const [categories, services] = await Promise.all([
        getServiceCategories(),
        getServicesByCategory(slug),
    ]);

    const category = categories.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    const categoryName = getLocalizedField(category, 'name', locale);
    const categoryDescription = getLocalizedField(category, 'description', locale);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <Link
                        href={`/${locale}/services`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('common.back') || 'Back to Services'}
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {categoryName}
                    </h1>

                    {categoryDescription && (
                        <p className="text-gray-600 mb-6">{categoryDescription}</p>
                    )}

                    <p className="text-sm text-gray-500">
                        {services.length} {t('services.title').toLowerCase()}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
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
        </div>
    );
}

// Generate static params for all categories
export async function generateStaticParams() {
    const categories = await getServiceCategories();

    return categories.map((category) => ({
        slug: category.slug,
    }));
}
