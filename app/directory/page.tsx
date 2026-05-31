import type { Metadata } from "next";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Operator } from "@/types";
import DirectoryClient from "@/components/DirectoryClient";

export const metadata: Metadata = {
  title: "Fleet Directory | Find Verified Vehicle Hire & Logistics in PNG",
  description: "Search 120+ IPA-verified fleet operators across Papua New Guinea. Filter by region, vehicle type and services.",
  openGraph: { url: "https://fleetpng.com/directory" },
};

// Fallback data shown when Supabase is not yet configured
const FALLBACK_OPERATORS: Operator[] = [
  {
    id: "1", company_name: "Kamkabe Investment Limited", brand_name: "Kamkabe Investment Limited",
    ipa_verified: true, tin_number: "500111111", main_phone: "+675 7000 0001",
    whatsapp_phone: "+675 7000 0001", primary_email: "info@kamkabe.com.pg",
    sales_email: null, bsp_account_details: null, operating_hours_weekday: "08:00-17:00",
    operating_hours_friday: "08:00-15:00", operating_hours_sunday: null,
    is_premium: true, created_at: new Date().toISOString(),
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsm-7UtiZ5I-C69PWGBaxlRIf3G2BEfPxNSFu-EegSrW8GtjUo1I_SeU68LtSPOuvzDm2gd1QXa_IQ8g3NSEjRXC5AjevMnx1SirxNHJBs_37HDUi0SEhta8fuA3eP90NQhOv7CrSR3clZMKqIfaXgyi5WJ6L6b7P-pLAUjXtyjKxoqToLh5uP7a7YTbgtPK5K8UG3smNUtezYnwAevrwiFahuj9ODDgd1JzcjCiQzMGI5cGWeSkp_MMnYDsMy024BB0ivQWyXcSzH",
    logo_url: null,
    branches: [{ id:"b1", operator_id:"1", province_region:"port-moresby", physical_address:"Waigani Drive, NCD", po_box:null, branch_phone:null }],
    services: { id:"s1", operator_id:"1", has_airport_transfer:true, has_corporate_pickup:true, has_escort_service:true, has_water_cart:false, has_car_dealership:false },
    fleet: [{ id:"f1", operator_id:"1", vehicle_category:"4x4", vehicle_model:"Toyota Hilux", capacity_seats:5, daily_rate_kina:450, hourly_rate_city:85, hourly_rate_outside:120, image_url:null }],
  },
  {
    id: "2", company_name: "Aimop Hires & Logistics", brand_name: "Aimop Hires & Logistics",
    ipa_verified: true, tin_number: "500342918", main_phone: "+675 7000 0002",
    whatsapp_phone: "+675 7000 0002", primary_email: "info@aimop.com.pg",
    sales_email: null, bsp_account_details: null, operating_hours_weekday: "08:00-17:00",
    operating_hours_friday: "08:00-15:00", operating_hours_sunday: null,
    is_premium: true, created_at: new Date().toISOString(),
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcJikPzOI0jto_-8UJkQB9KF10425KwyADyg-G1zTlDGx0JnV8gbVHO1dJa4CUn6Aunbfq7B5gK-wC3Wy-B5s02v0CRE0uV0WYfXXgz18GalFumiXxPGuVAnv9YOneNSeMRTdA2UuVrpy1EA5gI9FqlZCzYwfH5doCo36JdbCWWRbdPvGajhVKTKowEzAocUr5whf0rE_2-fZ343D_Ynhhg0hRwpHrPpHAiwODerYmHRgTE48SQokmL86lfCDUB4FpUBEIQrr9RQgQ",
    logo_url: null,
    branches: [
      { id:"b2", operator_id:"2", province_region:"lae", physical_address:"Milfordhaven Rd, Morobe", po_box:null, branch_phone:null },
      { id:"b3", operator_id:"2", province_region:"port-moresby", physical_address:"Waigani Drive, NCD", po_box:null, branch_phone:null },
    ],
    services: { id:"s2", operator_id:"2", has_airport_transfer:true, has_corporate_pickup:true, has_escort_service:false, has_water_cart:false, has_car_dealership:true },
    fleet: [{ id:"f2", operator_id:"2", vehicle_category:"truck", vehicle_model:"Hino Flatbed", capacity_seats:null, daily_rate_kina:2200, hourly_rate_city:180, hourly_rate_outside:280, image_url:null }],
  },
  {
    id: "3", company_name: "Paradise Transit Solutions", brand_name: "Paradise Transit Solutions",
    ipa_verified: true, tin_number: "500222222", main_phone: "+675 7000 0003",
    whatsapp_phone: "+675 7000 0003", primary_email: "info@paradise.com.pg",
    sales_email: null, bsp_account_details: null, operating_hours_weekday: "08:00-17:00",
    operating_hours_friday: "08:00-15:00", operating_hours_sunday: null,
    is_premium: false, created_at: new Date().toISOString(),
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpjea5HUpzDl5KT3bMtkSeLwie0smVB3O6VKAO2dqkL_hf6pFopZgQu3AdYDBTZDC8tPHdUxblpXj8McsbfJgbRRQ5KnaCGUxWxBav3ihPiJzqT0uZSStz-4Yyxu2PbCs0xCnjvCU8-5UFvxNzGFt3b1DNrGBec0soItLs5wBTikP6iYR6CIBqa5IvaZQ4jOWWtda5WWZIPj4145qZm7JchEuuKxiAbqM9qzz0l2i7q_5bBw7h8iBL1EOaPNQnepwAQ6RZ2adjUKqB",
    logo_url: null,
    branches: [{ id:"b4", operator_id:"3", province_region:"mt-hagen", physical_address:"Highlands Hwy, WHP", po_box:null, branch_phone:null }],
    services: { id:"s3", operator_id:"3", has_airport_transfer:true, has_corporate_pickup:false, has_escort_service:false, has_water_cart:false, has_car_dealership:false },
    fleet: [{ id:"f3", operator_id:"3", vehicle_category:"bus", vehicle_model:"10-Seater Bus", capacity_seats:10, daily_rate_kina:720, hourly_rate_city:75, hourly_rate_outside:110, image_url:null }],
  },
  {
    id: "4", company_name: "Niugini Civil Fleet", brand_name: "Niugini Civil Fleet",
    ipa_verified: true, tin_number: "500333333", main_phone: "+675 7000 0004",
    whatsapp_phone: "+675 7000 0004", primary_email: "info@niuginicivil.com.pg",
    sales_email: null, bsp_account_details: null, operating_hours_weekday: "08:00-17:00",
    operating_hours_friday: "08:00-15:00", operating_hours_sunday: null,
    is_premium: false, created_at: new Date().toISOString(),
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB8deRzN7QATi2L5WqlfqWFiIxL7wFW3XBb1bj0Ahool8KOyEhcPAZjrkc3EMCbzpPpSUkPiNCtvbQgXF6fEnfChoDJwFwrQ4fVcgEmVsd6-y3Iye7SRcXX59MjIOID6RCXjGtRH5MwqymkKKkq1q2q1E1jW7pn3h_PpZ3lZZBEL_QS1rdXSk0YyCEvSlrTICLeV38L-QRq2ZG8Pn60QkpCSHxqQWTy2h9U18byTD9EdETqLiGZD0gox4saxFGo0rQ8G4oAYoX67V6",
    logo_url: null,
    branches: [{ id:"b5", operator_id:"4", province_region:"mt-hagen", physical_address:"Highlands Hwy, WHP", po_box:null, branch_phone:null }],
    services: { id:"s4", operator_id:"4", has_airport_transfer:false, has_corporate_pickup:false, has_escort_service:false, has_water_cart:true, has_car_dealership:false },
    fleet: [{ id:"f4", operator_id:"4", vehicle_category:"truck", vehicle_model:"Water Cart Truck", capacity_seats:null, daily_rate_kina:1200, hourly_rate_city:180, hourly_rate_outside:280, image_url:null }],
  },
];

async function fetchOperators(): Promise<Operator[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("operators")
      .select(`*, branches:operator_branches(*), services:specialized_services(*), fleet:fleet_inventory(*)`)
      .order("is_premium", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return FALLBACK_OPERATORS;
    return data as Operator[];
  } catch {
    return FALLBACK_OPERATORS;
  }
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ regions?: string; categories?: string; services?: string }>;
}) {
  const params = await searchParams;
  const operators = await fetchOperators();

  return (
    <>
      {/* HERO */}
      <section className="hero-fullvp" aria-label="Directory hero">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsm-7UtiZ5I-C69PWGBaxlRIf3G2BEfPxNSFu-EegSrW8GtjUo1I_SeU68LtSPOuvzDm2gd1QXa_IQ8g3NSEjRXC5AjevMnx1SirxNHJBs_37HDUi0SEhta8fuA3eP90NQhOv7CrSR3clZMKqIfaXgyi5WJ6L6b7P-pLAUjXtyjKxoqToLh5uP7a7YTbgtPK5K8UG3smNUtezYnwAevrwiFahuj9ODDgd1JzcjCiQzMGI5cGWeSkp_MMnYDsMy024BB0ivQWyXcSzH"
          alt="Fleet of Land Cruiser vehicles in Port Moresby PNG logistics yard"
          fill className="hero-img" priority sizes="100vw"
        />
        <div className="hero-overlay" aria-hidden />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-14">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-white/60 text-xs font-medium flex-wrap">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li aria-hidden><span className="material-symbols-outlined text-xs">chevron_right</span></li>
              <li className="text-white font-bold">Fleet Directory</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-3">PNG Fleet Directory</h1>
          <p className="text-white/75 text-base max-w-xl leading-relaxed">Browse {operators.length}+ IPA-verified operators across Papua New Guinea.</p>
        </div>
      </section>

      {/* DIRECTORY CLIENT — handles filter UI + card display */}
      <DirectoryClient operators={operators} initialParams={params} />
      <div className="md:hidden h-16" aria-hidden />
    </>
  );
}
