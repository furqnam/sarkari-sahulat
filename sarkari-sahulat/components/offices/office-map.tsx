'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Office } from '@/types/office';
import { DEFAULT_MAP_CENTER } from '@/lib/constants';

interface OfficeMapProps {
    offices: Office[];
    userLocation?: { lat: number; lng: number };
    onOfficeSelect?: (office: Office) => void;
    selectedOfficeId?: string;
}

export function OfficeMap({
    offices,
    userLocation,
    onOfficeSelect,
    selectedOfficeId,
}: OfficeMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<mapboxgl.Marker[]>([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!mapboxToken) {
            console.error('Mapbox token not found');
            return;
        }

        mapboxgl.accessToken = mapboxToken;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: userLocation
                ? [userLocation.lng, userLocation.lat]
                : [DEFAULT_MAP_CENTER.lng, DEFAULT_MAP_CENTER.lat],
            zoom: userLocation ? 12 : DEFAULT_MAP_CENTER.zoom,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        map.current.on('load', () => {
            setMapLoaded(true);
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [userLocation]);

    // Add markers for offices
    useEffect(() => {
        if (!map.current || !mapLoaded) return;

        // Clear existing markers
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];

        // Add user location marker
        if (userLocation) {
            const userMarker = new mapboxgl.Marker({ color: '#3b82f6' })
                .setLngLat([userLocation.lng, userLocation.lat])
                .setPopup(
                    new mapboxgl.Popup().setHTML('<div class="p-2">Your Location</div>')
                )
                .addTo(map.current);
            markers.current.push(userMarker);
        }

        // Add office markers
        offices.forEach((office) => {
            if (!map.current) return;

            // Create custom marker element
            const el = document.createElement('div');
            el.className = 'office-marker';
            el.style.width = '32px';
            el.style.height = '32px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = getMarkerColor(office.type);
            el.style.border = selectedOfficeId === office.id ? '3px solid #fff' : '2px solid #fff';
            el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            el.style.cursor = 'pointer';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.innerHTML = getMarkerIcon(office.type);

            // Create popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3">
          <h3 class="font-semibold text-sm mb-1">${office.name}</h3>
          <p class="text-xs text-gray-600 mb-2">${office.address}</p>
          ${office.phone ? `<p class="text-xs text-gray-500">📞 ${office.phone}</p>` : ''}
        </div>
      `);

            const marker = new mapboxgl.Marker(el)
                .setLngLat([office.longitude, office.latitude])
                .setPopup(popup)
                .addTo(map.current);

            // Handle marker click
            el.addEventListener('click', () => {
                if (onOfficeSelect) {
                    onOfficeSelect(office);
                }
            });

            markers.current.push(marker);
        });

        // Fit map to show all markers
        if (offices.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();

            if (userLocation) {
                bounds.extend([userLocation.lng, userLocation.lat]);
            }

            offices.forEach((office) => {
                bounds.extend([office.longitude, office.latitude]);
            });

            map.current.fitBounds(bounds, {
                padding: 50,
                maxZoom: 15,
            });
        }
    }, [offices, mapLoaded, selectedOfficeId, userLocation, onOfficeSelect]);

    return (
        <div className="relative w-full h-full">
            <div ref={mapContainer} className="w-full h-full rounded-lg" />
            {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Loading map...</p>
                </div>
            )}
        </div>
    );
}

function getMarkerColor(type: string): string {
    const colors: Record<string, string> = {
        nadra: '#16a34a',
        passport: '#2563eb',
        court: '#7c3aed',
        police: '#dc2626',
        tax: '#ea580c',
        land_registry: '#ca8a04',
        vehicle_registration: '#0891b2',
        education: '#4f46e5',
        health: '#ec4899',
        other: '#6b7280',
    };
    return colors[type] || colors.other;
}

function getMarkerIcon(type: string): string {
    const icons: Record<string, string> = {
        nadra: '🆔',
        passport: '✈️',
        court: '⚖️',
        police: '🚔',
        tax: '💰',
        land_registry: '🏠',
        vehicle_registration: '🚗',
        education: '🎓',
        health: '🏥',
        other: '📍',
    };
    return icons[type] || icons.other;
}
