import { supabase } from './client';
import { Service, ServiceCategory } from '@/types/service';

/**
 * Get all service categories
 */
export async function getServiceCategories() {
    const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch service categories');
    }

    return data as ServiceCategory[];
}

/**
 * Get services by category
 */
export async function getServicesByCategory(categorySlug: string) {
    const { data, error } = await supabase
        .from('services')
        .select(`
      *,
      category:service_categories(*)
    `)
        .eq('category.slug', categorySlug)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching services:', error);
        throw new Error('Failed to fetch services');
    }

    return data as Service[];
}

/**
 * Get all services with optional filtering
 */
export async function getServices(options?: {
    categoryId?: string;
    search?: string;
    limit?: number;
    offset?: number;
}) {
    let query = supabase
        .from('services')
        .select(`
      *,
      category:service_categories(*)
    `, { count: 'exact' });

    // Apply filters
    if (options?.categoryId) {
        query = query.eq('category_id', options.categoryId);
    }

    if (options?.search) {
        query = query.or(`name.ilike.%${options.search}%,name_urdu.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    // Apply pagination
    if (options?.limit) {
        query = query.limit(options.limit);
    }

    if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    query = query.order('name', { ascending: true });

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching services:', error);
        throw new Error('Failed to fetch services');
    }

    return { services: data as Service[], total: count || 0 };
}

/**
 * Get a single service by slug
 */
export async function getServiceBySlug(slug: string) {
    const { data, error } = await supabase
        .from('services')
        .select(`
      *,
      category:service_categories(*)
    `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching service:', error);
        return null;
    }

    return data as Service;
}

/**
 * Get related services (same category)
 */
export async function getRelatedServices(serviceId: string, categoryId: string, limit: number = 3) {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category_id', categoryId)
        .neq('id', serviceId)
        .limit(limit);

    if (error) {
        console.error('Error fetching related services:', error);
        return [];
    }

    return data as Service[];
}

/**
 * Search services
 */
export async function searchServices(query: string, limit: number = 10) {
    const { data, error } = await supabase
        .from('services')
        .select(`
      *,
      category:service_categories(*)
    `)
        .or(`name.ilike.%${query}%,name_urdu.ilike.%${query}%,description.ilike.%${query}%,description_urdu.ilike.%${query}%`)
        .limit(limit);

    if (error) {
        console.error('Error searching services:', error);
        return [];
    }

    return data as Service[];
}

/**
 * Get popular services (you can customize this logic)
 */
export async function getPopularServices(limit: number = 6) {
    // For now, just get the first few services
    // In production, you'd track views/usage and sort by popularity
    const { data, error } = await supabase
        .from('services')
        .select(`
      *,
      category:service_categories(*)
    `)
        .limit(limit);

    if (error) {
        console.error('Error fetching popular services:', error);
        return [];
    }

    return data as Service[];
}
