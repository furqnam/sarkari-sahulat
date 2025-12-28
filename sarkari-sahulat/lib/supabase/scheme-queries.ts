import { supabase } from './client';

/**
 * Get all government schemes
 */
export async function getGovernmentSchemes(options?: {
    category?: string;
    isActive?: boolean;
    limit?: number;
}) {
    let query = supabase.from('government_schemes').select('*');

    if (options?.category) {
        query = query.eq('category', options.category);
    }

    if (options?.isActive !== undefined) {
        query = query.eq('is_active', options.isActive);
    }

    if (options?.limit) {
        query = query.limit(options.limit);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching schemes:', error);
        throw new Error('Failed to fetch government schemes');
    }

    return data;
}

/**
 * Get a single scheme by ID
 */
export async function getSchemeById(id: string) {
    const { data, error } = await supabase
        .from('government_schemes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching scheme:', error);
        return null;
    }

    return data;
}

/**
 * Search schemes
 */
export async function searchSchemes(query: string, limit: number = 10) {
    const { data, error } = await supabase
        .from('government_schemes')
        .select('*')
        .or(`title.ilike.%${query}%,title_urdu.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('is_active', true)
        .limit(limit);

    if (error) {
        console.error('Error searching schemes:', error);
        return [];
    }

    return data;
}
