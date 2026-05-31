export interface Operator {
  id: string;
  company_name: string;
  brand_name: string;
  ipa_verified: boolean;
  tin_number: string | null;
  main_phone: string;
  whatsapp_phone: string | null;
  primary_email: string;
  sales_email: string | null;
  bsp_account_details: string | null;
  operating_hours_weekday: string | null;
  operating_hours_friday: string | null;
  operating_hours_sunday: string | null;
  is_premium: boolean;
  created_at: string;
  hero_image_url: string | null;
  logo_url: string | null;
  // Joined
  branches?: OperatorBranch[];
  fleet?: FleetInventory[];
  services?: SpecializedServices | null;
}

export interface OperatorBranch {
  id: string;
  operator_id: string;
  province_region: string;
  physical_address: string;
  po_box: string | null;
  branch_phone: string | null;
}

export interface FleetInventory {
  id: string;
  operator_id: string;
  vehicle_category: string;
  vehicle_model: string;
  capacity_seats: number | null;
  daily_rate_kina: number | null;
  hourly_rate_city: number | null;
  hourly_rate_outside: number | null;
  image_url: string | null;
}

export interface SpecializedServices {
  id: string;
  operator_id: string;
  has_airport_transfer: boolean;
  has_corporate_pickup: boolean;
  has_escort_service: boolean;
  has_water_cart: boolean;
  has_car_dealership: boolean;
}

export interface QuoteRequest {
  operator_id: string;
  origin: string;
  destination: string;
  transit_date: string;
  personnel_level: string;
  vehicle_requirements: string[];
  passengers: number;
  cargo_type: string;
  cargo_value: string | null;
  contact_email: string;
  contact_phone: string;
  special_instructions: string | null;
}

export type FilterState = {
  regions: string[];
  categories: string[];
  services: string[];
};
