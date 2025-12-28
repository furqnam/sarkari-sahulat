'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getNearbyOffices, getOffices } from '@/lib/supabase/office-queries';
import { Office } from '@/types/office';
import { OfficeMap } from '@/components/offices/office-map';
import { OfficeCard } from '@/components/offices/office-card';
import { OfficeFilters } from '@/components/offices/office-filters';
import { Loader2, MapPin, List } from 'lucide-react';

export default function OfficesPage() {
    const t = useTranslations();
    const locale = useLocale();
    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

    // Request user location
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.log('Location access denied:', error);
                }
            );
        }
    }, []);

    // Fetch offices
    useEffect(() => {
        async function fetchOffices() {
            setLoading(true);
            try {
                let result: Office[];

                if (userLocation && !selectedCity && !selectedType) {
                    // Get nearby offices if we have user location
                    result = await getNearbyOffices({
                        lat: userLocation.lat,
                        lng: userLocation.lng,
                        type: selectedType || undefined,
                        radius: 50,
                        limit: 50,
                    });
                } else {
                    // Get filtered offices
                    result = await getOffices({
                        type: selectedType || undefined,
                        city: selectedCity || undefined,
                        limit: 50,
                    });
                }

                setOffices(result);
            } catch (error) {
                console.error('Error fetching offices:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchOffices();
    }, [userLocation, selectedType, selectedCity]);

    const selectedOffice = offices.find((o) => o.id === selectedOfficeId);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {t('offices.title')}
                    </h1>
                    <p className="text-gray-600">
                        {offices.length} {locale === 'ur' ? 'دفاتر ملے' : 'offices found'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar - Filters */}
                    <div className="lg:col-span-1">
                        <OfficeFilters
                            selectedType={selectedType}
                            selectedCity={selectedCity}
                            onTypeChange={setSelectedType}
                            onCityChange={setSelectedCity}
                        />

                        {/* View Mode Toggle (Mobile) */}
                        <div className="lg:hidden mt-4 flex gap-2">
                            <button
                                onClick={() => setViewMode('map')}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${viewMode === 'map'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300'
                                    }`}
                            >
                                <MapPin className="w-4 h-4" />
                                {locale === 'ur' ? 'نقشہ' : 'Map'}
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${viewMode === 'list'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                {locale === 'ur' ? 'فہرست' : 'List'}
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex items-center justify-center h-96 bg-white rounded-lg">
                                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Map View */}
                                <div className={`${viewMode === 'list' ? 'hidden lg:block' : ''}`}>
                                    <div className="bg-white rounded-lg p-4 h-[600px]">
                                        <OfficeMap
                                            offices={offices}
                                            userLocation={userLocation || undefined}
                                            onOfficeSelect={(office) => setSelectedOfficeId(office.id)}
                                            selectedOfficeId={selectedOfficeId || undefined}
                                        />
                                    </div>
                                </div>

                                {/* List View */}
                                <div className={`${viewMode === 'map' ? 'hidden lg:block' : ''}`}>
                                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                        {offices.length === 0 ? (
                                            <div className="text-center py-12 bg-white rounded-lg">
                                                <p className="text-gray-500">
                                                    {locale === 'ur' ? 'کوئی دفتر نہیں ملا' : 'No offices found'}
                                                </p>
                                            </div>
                                        ) : (
                                            offices.map((office) => (
                                                <OfficeCard
                                                    key={office.id}
                                                    office={office}
                                                    onSelect={() => setSelectedOfficeId(office.id)}
                                                    isSelected={selectedOfficeId === office.id}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
