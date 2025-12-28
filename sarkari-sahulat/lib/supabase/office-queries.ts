import { supabase } from './client';
import { Office, OfficeSearchParams } from '@/types/office';
import { calculateDistance, sortOfficesByDistance } from '@/lib/utils/distance';

/**
 * Get all offices with optional filtering
 */
export async function getOffices(options?: {
    city?: string;
    type?: string;
    province?: string;
    limit?: number;
}) {
    let query = supabase.from('offices').select('*');

    if (options?.city) {
        query = query.ilike('city', options.city);
    }

    if (options?.type) {
        query = query.eq('type', options.type);
    }

    if (options?.province) {
        query = query.eq('province', options.province);
    }

    if (options?.limit) {
        query = query.limit(options.limit);
    }

    query = query.order('city', { ascending: true });

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching offices:', error);
        throw new Error('Failed to fetch offices');
    }

    return data as Office[];
}

/**
 * Get offices near a location
 */
export async function getNearbyOffices(params: OfficeSearchParams) {
    const { lat, lng, type, radius = 50, limit = 20 } = params;

    // Fetch all offices (or filter by type)
    let query = supabase.from('offices').select('*');

    if (type) {
        query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching offices:', error);
        throw new Error('Failed to fetch offices');
    }

    if (!lat || !lng) {
        return data as Office[];
    }

    // Calculate distances and filter by radius
    const officesWithDistance = sortOfficesByDistance(data || [], lat, lng);

    // Filter by radius (in km)
    const nearbyOffices = officesWithDistance.filter(
        (office) => office.distance <= radius
    );

    // Limit results
    return nearbyOffices.slice(0, limit);
}

/**
 * Get offices by city
 */
export async function getOfficesByCity(city: string) {
    const { data, error } = await supabase
        .from('offices')
        .select('*')
        .ilike('city', city)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching offices:', error);
        throw new Error('Failed to fetch offices');
    }

    return data as Office[];
}

/**
 * Get a single office by ID
 */
export async function getOfficeById(id: string) {
    const { data, error } = await supabase
        .from('offices')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching office:', error);
        return null;
    }

    return data as Office;
}

/**
 * Get unique cities from offices
 */
export async function getOfficeCities() {
    const { data, error } = await supabase
        .from('offices')
        .select('city, province')
        .order('city', { ascending: true });

    if (error) {
        console.error('Error fetching cities:', error);
        return [];
    }

    // Get unique cities
    const uniqueCities = Array.from(
        new Set(data.map((office) => office.city))
    ).map((city) => {
        const office = data.find((o) => o.city === city);
        return {
            city,
            province: office?.province || '',
        };
    });

    return uniqueCities;
}

/**
 * Search offices by name or address
 */
export async function searchOffices(query: string, limit: number = 10) {
    const { data, error } = await supabase
        .from('offices')
        .select('*')
        .or(`name.ilike.%${query}%,address.ilike.%${query}%,city.ilike.%${query}%`)
        .limit(limit);

    if (error) {
        console.error('Error searching offices:', error);
        return [];
    }

    return data as Office[];
}
