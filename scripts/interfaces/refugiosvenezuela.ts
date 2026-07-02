export interface RefugiosVzlaApiPlacesResponse {
    data: Datum[];
    pagination: Pagination;
}

export interface Datum {
    id: string;
    name: string;
    type: string;
    address: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    capacity: number;
    current_occupancy: number;
    status: string;
    managed_by: null | string;
    contact_phone: null;
    contact_whatsapp: null;
    has_water: boolean;
    has_food: boolean;
    has_medical: boolean;
    has_electricity: boolean;
    pets_allowed: boolean;
    notes: null | string;
    reporter_name: null | string;
    reporter_contact: null;
    verified: boolean;
    created_at: Date;
    updated_at: Date;
    kind: string;
    food_type: null;
    schedule: null;
    accepts_donations: boolean;
    is_free: boolean;
    needs: null;
}

export interface Pagination {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
    has_more: boolean;
}
