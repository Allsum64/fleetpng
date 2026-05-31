"use client";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Operator } from "@/types";

const REGIONS = [
  { value: "port-moresby", label: "Port Moresby" },
  { value: "lae", label: "Lae" },
  { value: "kokopo", label: "Kokopo" },
  { value: "madang", label: "Madang" },
  { value: "mt-hagen", label: "Mt Hagen" },
];
const CATEGORIES = [
  { value: "4x4", label: "4x4 Off-Road" },
  { value: "sedan-suv", label: "Sedan & SUV" },
  { value: "bus", label: "Bus (15–30 Seater)" },
  { value: "truck", label: "Heavy Truck" },
];
const SERVICES = [
  { value: "airport-transfer", label: "Airport Transfer" },
  { value: "escort", label: "Escort Service" },
  { value: "water-cart", label: "Water Cart" },
  { value: "car-dealer", label: "Car Dealership" },
];

function operatorRegions(op: Operator): string[] {
  return (op.branches ?? []).map((b) => b.province_region.toLowerCase().replace(/\s+/g, "-"));
}
function operatorCategories(op: Operator): string[] {
  return (op.fleet ?? []).map((f) => f.vehicle_category.toLowerCase().replace(/\s+/g, "-"));
}
function operatorServices(op: Operator): string[] {
  const s = op.services;
  if (!s) return [];
  const tags: string[] = [];
  if (s.has_airport_transfer) tags.push("airport-transfer");
  if (s.has_escort_service) tags.push("escort");
  if (s.has_water_cart) tags.push("water-cart");
  if (s.has_car_dealership) tags.push("car-dealer");
  if (s.has_corporate_pickup) tags.push("corporate");
  return tags;
}

function startingRate(op: Operator): number | null {
  const rates = (op.fleet ?? []).map((f) => f.daily_rate_kina).filter((r): r is number => r !== null);
  return rates.length ? Math.min(...rates) : null;
}

interface Props {
  operators: Operator[];
  initialParams: { regions?: string; categories?: string; services?: string };
}

export default function DirectoryClient({ operators, initialParams }: Props) {
  const [regions, setRegions]       = useState<string[]>(initialParams.regions ? initialParams.regions.split(",").filter(Boolean) : []);
  const [categories, setCategories] = useState<string[]>(initialParams.categories ? initialParams.categories.split(",").filter(Boolean) : []);
  const [services, setServices]     = useState<string[]>(initialParams.services ? initialParams.services.split(",").filter(Boolean) : []);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = useCallback((set: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    set((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  }, []);

  const clearAll = () => { setRegions([]); setCategories([]); setServices([]); };

  const filtered = useMemo(() => operators.filter((op) => {
    const opRegions   = operatorRegions(op);
    const opCats      = operatorCategories(op);
    const opSvcs      = operatorServices(op);
    const regionOk    = regions.length === 0    || regions.some((r) => opRegions.includes(r));
    const categoryOk  = categories.length === 0 || categories.some((c) => opCats.includes(c));
    const serviceOk   = services.length === 0   || services.some((s) => opSvcs.includes(s));
    return regionOk && categoryOk && serviceOk;
  }), [operators, regions, categories, services]);

  const Filters = () => (
    <div className="space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-black">Filters</h2>
        {(regions.length + categories.length + services.length) > 0 && (
          <button onClick={clearAll} className="text-xs font-bold text-red-600 hover:underline">CLEAR ALL</button>
        )}
      </div>
      {[
        { label: "Province / Region", options: REGIONS, state: regions, setter: setRegions },
        { label: "Vehicle Category",  options: CATEGORIES, state: categories, setter: setCategories },
        { label: "Specialized Services", options: SERVICES, state: services, setter: setServices },
      ].map(({ label, options, state, setter }) => (
        <fieldset key={label}>
          <legend className="text-xs font-bold tracking-wider uppercase text-gray-500 mb-3">{label}</legend>
          <div className="space-y-2.5">
            {options.map((o) => (
              <label key={o.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={state.includes(o.value)}
                  onChange={() => toggle(setter, o.value)}
                  className="w-4 h-4 rounded border-gray-400 accent-black"
                />
                <span className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row">
      {/* Mobile filter overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 md:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={() => setMobileOpen(false)} aria-label="Close filters">
              <span className="material-symbols-outlined">close</span>
            </button>
            <Filters />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[280px] shrink-0 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto bg-[#f2f4f6] border-r border-[#E2E8F0] p-6 custom-scrollbar">
        <Filters />
      </aside>

      {/* Results */}
      <section className="flex-1 p-4 md:p-10 bg-[#f7f9fb]" aria-label="Search results">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Fleet Directory</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing{" "}
              <strong className="text-black">{filtered.length} Operator{filtered.length !== 1 ? "s" : ""}</strong>
              {(regions.length + categories.length + services.length) > 0 && (
                <span className="text-gray-500"> — filtered results</span>
              )}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
              onClick={() => setMobileOpen(true)}
            >
              <span className="material-symbols-outlined text-base">tune</span>
              Filters {(regions.length + categories.length + services.length) > 0 && `(${regions.length + categories.length + services.length})`}
            </button>
            <select className="bg-white border border-gray-200 rounded px-4 py-2 text-sm font-medium focus:ring-black focus:border-black outline-none" defaultValue="rated">
              <option value="rated">Highest Rated</option>
              <option value="price">Price: Low to High</option>
              <option value="recent">Recently Verified</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-gray-300 block mb-4">search_off</span>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No operators found</h3>
            <p className="text-sm text-gray-500 mb-6">Try removing some filters to see more results.</p>
            <button onClick={clearAll} className="px-6 py-2.5 bg-black text-white text-xs font-bold tracking-wider rounded-lg hover:bg-gray-800 transition-all">
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" role="list">
            {filtered.map((op) => {
              const rate = startingRate(op);
              const regions = operatorRegions(op);
              const svcs = operatorServices(op);
              return (
                <article key={op.id} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group" role="listitem">
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    {op.hero_image_url ? (
                      <Image src={op.hero_image_url} alt={`${op.brand_name} fleet`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:1024px)100vw,50vw" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-gray-400">directions_car</span>
                      </div>
                    )}
                    {op.ipa_verified && (
                      <div className="absolute top-4 right-4 bg-[#fed01b] text-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined icon-fill text-sm">verified</span>
                        <span className="text-[11px] font-bold">IPA VERIFIED</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-black">{op.brand_name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="material-symbols-outlined text-gray-400 text-base">location_on</span>
                          <span className="text-xs text-gray-500">{regions.map((r) => r.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())).join(", ")}</span>
                        </div>
                      </div>
                      {rate !== null && (
                        <div className="text-right shrink-0">
                          <p className="text-[10px] font-bold tracking-wider text-gray-500">FROM</p>
                          <p className="text-lg font-bold text-black">K{rate.toLocaleString()} <span className="text-xs text-gray-400 font-normal">/ day</span></p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {svcs.map((s) => (
                        <span key={s} className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded">
                          {s.replace(/-/g," ").toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-2 flex gap-3">
                      <Link href={`/operator/${op.id}`} className="flex-1 bg-black text-white py-3 rounded text-xs font-bold tracking-wider text-center hover:bg-gray-800 transition-all uppercase">
                        View Fleet
                      </Link>
                      <a href={`tel:${op.main_phone}`} className="px-4 py-3 bg-[#EA580C] text-white rounded hover:brightness-110 transition-all" aria-label={`Call ${op.brand_name}`}>
                        <span className="material-symbols-outlined text-base">call</span>
                      </a>
                      {op.whatsapp_phone && (
                        <a href={`https://wa.me/${op.whatsapp_phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-[#fed01b] text-black rounded hover:brightness-110 transition-all" aria-label={`WhatsApp ${op.brand_name}`}>
                          <span className="material-symbols-outlined text-base">chat</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
