"use client";
import { useActionState, useState } from "react";
import { createOperator, OperatorFormState } from "@/app/admin/operators/actions";

type Branch  = { region: string; address: string; po_box: string };
type Vehicle = { category: string; model: string; seats: string; daily: string; city: string; outside: string; image_url: string };

const REGION_OPTIONS = [
  { value: "port-moresby", label: "Port Moresby" },
  { value: "lae",          label: "Lae" },
  { value: "kokopo",       label: "Kokopo" },
  { value: "madang",       label: "Madang" },
  { value: "mt-hagen",     label: "Mt Hagen" },
];
const CATEGORY_OPTIONS = [
  { value: "4x4",       label: "4x4 Off-Road" },
  { value: "sedan-suv", label: "Sedan / SUV" },
  { value: "bus",       label: "Bus" },
  { value: "truck",     label: "Heavy Truck" },
];

const emptyBranch  = (): Branch  => ({ region: "port-moresby", address: "", po_box: "" });
const emptyVehicle = (): Vehicle => ({ category: "4x4", model: "", seats: "", daily: "", city: "", outside: "", image_url: "" });

// ── Shared field styles ────────────────────────────────────────────────────
const inp = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-[#fed01b] focus:ring-1 focus:ring-[#fed01b] outline-none transition-all";
const lbl = "block text-[10px] font-bold tracking-wider uppercase text-gray-400 mb-1.5";
const sel = inp + " cursor-pointer";

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-7 h-7 rounded-full bg-[#fed01b] text-black flex items-center justify-center text-xs font-bold shrink-0">{num}</span>
      <h3 className="text-base font-semibold text-white">{title}</h3>
    </div>
  );
}

export default function OperatorForm() {
  const [state, action, pending] = useActionState<OperatorFormState, FormData>(createOperator, null);
  const [branches, setBranches]  = useState<Branch[]>([emptyBranch()]);
  const [vehicles, setVehicles]  = useState<Vehicle[]>([emptyVehicle()]);

  // Branch helpers
  const updateBranch  = (i: number, k: keyof Branch,  v: string) => setBranches(prev  => prev.map((b, idx) => idx === i ? { ...b,  [k]: v } : b));
  const updateVehicle = (i: number, k: keyof Vehicle, v: string) => setVehicles(prev => prev.map((v2, idx) => idx === i ? { ...v2, [k]: v } : v2));

  return (
    <form
      action={(fd) => {
        fd.set("branches_json", JSON.stringify(branches));
        fd.set("vehicles_json", JSON.stringify(vehicles));
        action(fd);
      }}
      className="space-y-8"
    >
      {/* Global error */}
      {state?.error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      {/* ── SECTION 1: Company Details ──────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeading num="1" title="Company Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>Brand / Trading Name <span className="text-red-400">*</span></label>
            <input name="brand_name" required className={inp} placeholder="e.g. Aimop Hires & Car Dealers"
              defaultValue="" />
            {state?.fieldErrors?.brand_name && <p className="text-red-400 text-xs mt-1">{state.fieldErrors.brand_name}</p>}
          </div>
          <div>
            <label className={lbl}>Legal Company Name <span className="text-red-400">*</span></label>
            <input name="company_name" required className={inp} placeholder="e.g. Kamkabe Investment Limited" />
            {state?.fieldErrors?.company_name && <p className="text-red-400 text-xs mt-1">{state.fieldErrors.company_name}</p>}
          </div>
          <div>
            <label className={lbl}>Main Phone <span className="text-red-400">*</span></label>
            <input name="main_phone" required type="tel" className={inp} placeholder="+675 7000 0000" />
            {state?.fieldErrors?.main_phone && <p className="text-red-400 text-xs mt-1">{state.fieldErrors.main_phone}</p>}
          </div>
          <div>
            <label className={lbl}>WhatsApp Number</label>
            <input name="whatsapp_phone" type="tel" className={inp} placeholder="+675 7000 0000" />
          </div>
          <div>
            <label className={lbl}>Primary Email <span className="text-red-400">*</span></label>
            <input name="primary_email" required type="email" className={inp} placeholder="bookings@company.com.pg" />
            {state?.fieldErrors?.primary_email && <p className="text-red-400 text-xs mt-1">{state.fieldErrors.primary_email}</p>}
          </div>
          <div>
            <label className={lbl}>Sales Email</label>
            <input name="sales_email" type="email" className={inp} placeholder="sales@company.com.pg" />
          </div>
          <div>
            <label className={lbl}>TIN Number</label>
            <input name="tin_number" className={inp} placeholder="500XXXXXX" />
          </div>
          <div className="flex flex-col gap-3 pt-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input name="ipa_verified" type="hidden" value="false" />
              <input name="ipa_verified" type="checkbox" value="true" className="w-4 h-4 rounded accent-[#fed01b]" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">IPA Verified</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input name="is_premium" type="checkbox" className="w-4 h-4 rounded accent-[#fed01b]" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Premium listing (appears first)</span>
            </label>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={lbl}>Mon – Thu Hours</label>
            <input name="operating_hours_weekday" className={inp} placeholder="08:00 – 17:00" />
          </div>
          <div>
            <label className={lbl}>Friday Hours</label>
            <input name="operating_hours_friday" className={inp} placeholder="08:00 – 15:00" />
          </div>
          <div>
            <label className={lbl}>Sunday / Holidays</label>
            <input name="operating_hours_sunday" className={inp} placeholder="Closed" />
          </div>
        </div>

        {/* Images */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>Hero Image URL</label>
            <input name="hero_image_url" type="url" className={inp} placeholder="https://..." />
            <p className="text-gray-500 text-[10px] mt-1">Full-width cover image shown on the operator profile hero.</p>
          </div>
          <div>
            <label className={lbl}>Logo URL</label>
            <input name="logo_url" type="url" className={inp} placeholder="https://..." />
            <p className="text-gray-500 text-[10px] mt-1">Company logo shown in the header card.</p>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Branch Locations ─────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeading num="2" title="Branch Locations" />
        <div className="space-y-4">
          {branches.map((b, i) => (
            <div key={i} className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Branch {i + 1}</span>
                {branches.length > 1 && (
                  <button type="button" onClick={() => setBranches(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-500 hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={lbl}>Province / Region <span className="text-red-400">*</span></label>
                  <select value={b.region} onChange={e => updateBranch(i, "region", e.target.value)} className={sel}>
                    {REGION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Physical Address <span className="text-red-400">*</span></label>
                  <input value={b.address} onChange={e => updateBranch(i, "address", e.target.value)}
                    className={inp} placeholder="Street, Suburb" />
                </div>
                <div>
                  <label className={lbl}>PO Box</label>
                  <input value={b.po_box} onChange={e => updateBranch(i, "po_box", e.target.value)}
                    className={inp} placeholder="PO Box 123, NCD" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setBranches(prev => [...prev, emptyBranch()])}
          className="mt-4 flex items-center gap-2 text-[#fed01b] text-sm font-bold hover:underline">
          <span className="material-symbols-outlined text-base">add_circle</span>
          Add Another Branch
        </button>
      </div>

      {/* ── SECTION 3: Fleet / Vehicles ─────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeading num="3" title="Fleet Vehicles" />
        <div className="space-y-4">
          {vehicles.map((v, i) => (
            <div key={i} className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vehicle {i + 1}</span>
                {vehicles.length > 1 && (
                  <button type="button" onClick={() => setVehicles(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-500 hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className={lbl}>Category <span className="text-red-400">*</span></label>
                  <select value={v.category} onChange={e => updateVehicle(i, "category", e.target.value)} className={sel}>
                    {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={lbl}>Vehicle Model <span className="text-red-400">*</span></label>
                  <input value={v.model} onChange={e => updateVehicle(i, "model", e.target.value)}
                    className={inp} placeholder="e.g. Toyota Hilux (Gen 8)" />
                </div>
                <div>
                  <label className={lbl}>Seats</label>
                  <input type="number" value={v.seats} onChange={e => updateVehicle(i, "seats", e.target.value)}
                    className={inp} placeholder="5" min="1" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div>
                  <label className={lbl}>Daily Rate (K)</label>
                  <input type="number" step="0.01" value={v.daily} onChange={e => updateVehicle(i, "daily", e.target.value)}
                    className={inp} placeholder="850.00" />
                </div>
                <div>
                  <label className={lbl}>Hourly City (K)</label>
                  <input type="number" step="0.01" value={v.city} onChange={e => updateVehicle(i, "city", e.target.value)}
                    className={inp} placeholder="85.00" />
                </div>
                <div>
                  <label className={lbl}>Hourly Outside (K)</label>
                  <input type="number" step="0.01" value={v.outside} onChange={e => updateVehicle(i, "outside", e.target.value)}
                    className={inp} placeholder="120.00" />
                </div>
                <div>
                  <label className={lbl}>Vehicle Image URL</label>
                  <input type="url" value={v.image_url} onChange={e => updateVehicle(i, "image_url", e.target.value)}
                    className={inp} placeholder="https://..." />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setVehicles(prev => [...prev, emptyVehicle()])}
          className="mt-4 flex items-center gap-2 text-[#fed01b] text-sm font-bold hover:underline">
          <span className="material-symbols-outlined text-base">add_circle</span>
          Add Another Vehicle
        </button>
      </div>

      {/* ── SECTION 4: Specialized Services ─────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeading num="4" title="Specialized Services" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            ["has_airport_transfer", "flight_takeoff", "Airport Transfer"],
            ["has_corporate_pickup", "corporate_fare", "Corporate Pickup"],
            ["has_escort_service",   "local_police",   "Escort Service"],
            ["has_water_cart",       "water_drop",     "Water Cart"],
            ["has_car_dealership",   "car_rental",     "Car Dealership"],
          ].map(([name, icon, label]) => (
            <label key={name} className="flex items-center gap-3 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 cursor-pointer hover:border-[#fed01b] transition-all group">
              <input type="checkbox" name={name} className="w-4 h-4 rounded accent-[#fed01b]" />
              <span className="material-symbols-outlined text-gray-400 group-hover:text-[#fed01b] text-base transition-colors">{icon}</span>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Submit ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pb-6">
        <a href="/admin/operators"
          className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg text-xs font-bold tracking-wider hover:bg-gray-800 transition-all text-center">
          CANCEL
        </a>
        <button type="submit" disabled={pending}
          className="px-10 py-3 bg-[#fed01b] text-black rounded-lg text-xs font-bold tracking-wider hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {pending ? (
            <><span className="material-symbols-outlined text-sm animate-spin">sync</span>SAVING...</>
          ) : (
            <><span className="material-symbols-outlined text-sm">save</span>SAVE OPERATOR</>
          )}
        </button>
      </div>
    </form>
  );
}
