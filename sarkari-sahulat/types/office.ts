export interface Office {
    id: string;
    name: string;
    type: OfficeType;
    department: string | null;
    address: string;
    city: string;
    province: string;
    latitude: number;
    longitude: number;
    phone: string | null;
    email: string | null;
    website: string | null;
    timings: OfficeTimings | null;
    services_offered: string[] | null;
    distance?: number; // Calculated distance from user location
}

export type OfficeType =
    | 'nadra'
    | 'passport'
    | 'court'
    | 'police'
    | 'tax'
    | 'land_registry'
    | 'vehicle_registration'
    | 'education'
    | 'health'
    | 'other';

export interface OfficeTimings {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
}

export interface OfficeSearchParams {
    lat?: number;
    lng?: number;
    city?: string;
    type?: OfficeType;
    radius?: number; // in kilometers
    limit?: number;
}
