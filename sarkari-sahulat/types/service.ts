export interface Service {
    id: string;
    name: string;
    name_urdu: string;
    slug: string;
    description: string;
    description_urdu: string;
    category_id: string | null;
    department: string | null;
    requirements: Requirement[];
    fees: FeeStructure;
    processing_time: string | null;
    urgency_options: UrgencyOption[] | null;
    how_to_apply: string | null;
    how_to_apply_urdu: string | null;
    online_portal_url: string | null;
    is_online_available: boolean;
    tracking_info: TrackingInfo | null;
    created_at: string;
}

export interface Requirement {
    text: string;
    text_urdu: string;
    type: 'document' | 'info' | 'prerequisite';
}

export interface FeeStructure {
    normal?: number;
    urgent?: number;
    executive?: number;
    currency: string;
    additional_fees?: AdditionalFee[];
}

export interface AdditionalFee {
    name: string;
    name_urdu: string;
    amount: number;
    optional: boolean;
}

export interface UrgencyOption {
    type: string;
    days: number;
    fee: number;
}

export interface TrackingInfo {
    url: string;
    required_fields: string[];
    instructions?: string;
    instructions_urdu?: string;
}

export interface ServiceCategory {
    id: string;
    name: string;
    name_urdu: string;
    slug: string;
    icon: string | null;
    description: string | null;
    description_urdu: string | null;
    sort_order: number;
}
