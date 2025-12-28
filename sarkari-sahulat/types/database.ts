export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            services: {
                Row: {
                    id: string
                    name: string
                    name_urdu: string
                    slug: string
                    description: string
                    description_urdu: string
                    category_id: string | null
                    department: string | null
                    requirements: Json
                    fees: Json
                    processing_time: string | null
                    urgency_options: Json | null
                    how_to_apply: string | null
                    how_to_apply_urdu: string | null
                    online_portal_url: string | null
                    is_online_available: boolean
                    tracking_info: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    name_urdu: string
                    slug: string
                    description: string
                    description_urdu: string
                    category_id?: string | null
                    department?: string | null
                    requirements: Json
                    fees: Json
                    processing_time?: string | null
                    urgency_options?: Json | null
                    how_to_apply?: string | null
                    how_to_apply_urdu?: string | null
                    online_portal_url?: string | null
                    is_online_available?: boolean
                    tracking_info?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    name_urdu?: string
                    slug?: string
                    description?: string
                    description_urdu?: string
                    category_id?: string | null
                    department?: string | null
                    requirements?: Json
                    fees?: Json
                    processing_time?: string | null
                    urgency_options?: Json | null
                    how_to_apply?: string | null
                    how_to_apply_urdu?: string | null
                    online_portal_url?: string | null
                    is_online_available?: boolean
                    tracking_info?: Json | null
                    created_at?: string
                }
            }
            service_categories: {
                Row: {
                    id: string
                    name: string
                    name_urdu: string
                    slug: string
                    icon: string | null
                    description: string | null
                    description_urdu: string | null
                    sort_order: number
                }
                Insert: {
                    id?: string
                    name: string
                    name_urdu: string
                    slug: string
                    icon?: string | null
                    description?: string | null
                    description_urdu?: string | null
                    sort_order?: number
                }
                Update: {
                    id?: string
                    name?: string
                    name_urdu?: string
                    slug?: string
                    icon?: string | null
                    description?: string | null
                    description_urdu?: string | null
                    sort_order?: number
                }
            }
            offices: {
                Row: {
                    id: string
                    name: string
                    type: string
                    department: string | null
                    address: string
                    city: string
                    province: string
                    latitude: number
                    longitude: number
                    phone: string | null
                    email: string | null
                    website: string | null
                    timings: Json | null
                    services_offered: string[] | null
                }
                Insert: {
                    id?: string
                    name: string
                    type: string
                    department?: string | null
                    address: string
                    city: string
                    province: string
                    latitude: number
                    longitude: number
                    phone?: string | null
                    email?: string | null
                    website?: string | null
                    timings?: Json | null
                    services_offered?: string[] | null
                }
                Update: {
                    id?: string
                    name?: string
                    type?: string
                    department?: string | null
                    address?: string
                    city?: string
                    province?: string
                    latitude?: number
                    longitude?: number
                    phone?: string | null
                    email?: string | null
                    website?: string | null
                    timings?: Json | null
                    services_offered?: string[] | null
                }
            }
            government_schemes: {
                Row: {
                    id: string
                    title: string
                    title_urdu: string
                    description: string
                    description_urdu: string
                    eligibility_criteria: Json | null
                    benefits: string | null
                    benefits_urdu: string | null
                    how_to_apply: string | null
                    how_to_apply_urdu: string | null
                    deadline: string | null
                    category: string | null
                    department: string | null
                    is_active: boolean
                }
                Insert: {
                    id?: string
                    title: string
                    title_urdu: string
                    description: string
                    description_urdu: string
                    eligibility_criteria?: Json | null
                    benefits?: string | null
                    benefits_urdu?: string | null
                    how_to_apply?: string | null
                    how_to_apply_urdu?: string | null
                    deadline?: string | null
                    category?: string | null
                    department?: string | null
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    title?: string
                    title_urdu?: string
                    description?: string
                    description_urdu?: string
                    eligibility_criteria?: Json | null
                    benefits?: string | null
                    benefits_urdu?: string | null
                    how_to_apply?: string | null
                    how_to_apply_urdu?: string | null
                    deadline?: string | null
                    category?: string | null
                    department?: string | null
                    is_active?: boolean
                }
            }
            faqs: {
                Row: {
                    id: string
                    question: string
                    question_urdu: string
                    answer: string
                    answer_urdu: string
                    service_id: string | null
                    category: string | null
                    sort_order: number
                }
                Insert: {
                    id?: string
                    question: string
                    question_urdu: string
                    answer: string
                    answer_urdu: string
                    service_id?: string | null
                    category?: string | null
                    sort_order?: number
                }
                Update: {
                    id?: string
                    question?: string
                    question_urdu?: string
                    answer?: string
                    answer_urdu?: string
                    service_id?: string | null
                    category?: string | null
                    sort_order?: number
                }
            }
            user_reminders: {
                Row: {
                    id: string
                    user_id: string | null
                    service_name: string
                    reminder_date: string
                    reminder_type: string | null
                    notes: string | null
                    is_completed: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    service_name: string
                    reminder_date: string
                    reminder_type?: string | null
                    notes?: string | null
                    is_completed?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    service_name?: string
                    reminder_date?: string
                    reminder_type?: string | null
                    notes?: string | null
                    is_completed?: boolean
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
