"use client";
import { useActionState, useEffect, useRef } from "react";
import { submitQuoteRequest, QuoteFormState } from "@/app/actions";
import Link from "next/link";

const INITIAL: QuoteFormState = { status: "idle" };

export default function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuoteRequest, INITIAL);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={successRef} className="bg-[#15803D] text-white rounded-xl p-10 flex flex-col md:flex-row items-center gap-6" role="alert">
        <span className="material-symbols-outlined icon-fill text-6xl shrink-0">check_circle</span>
        <div>
          <h3 className="text-2xl font-bold mb-2">Quote Request Submitted!</h3>
          <p className="text-white/85 text-sm leading-relaxed mb-4">Your secure transit request has been received. Aimop Hires dispatch will contact you via email and WhatsApp within 2 hours.</p>
          <Link href="/directory" className="inline-block bg-white text-black px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider hover:bg-gray-100 transition-all">BACK TO DIRECTORY</Link>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-10 shadow-sm flex flex-col gap-10">

      {state.status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium" role="alert">
          {state.message}
        </div>
      )}

      {/* Section 1 */}
      <fieldset className="flex flex-col gap-6">
        <legend className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">01</span>
          <h2 className="text-lg font-semibold text-black">Journey Details</h2>
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="origin" className="text-xs font-bold tracking-wider uppercase text-black">Origin <span className="text-red-500">*</span></label>
            <select id="origin" name="origin" required className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all">
              <option value="">Select Departure</option>
              {["Port Moresby","Lae (Nadzab)","Mt Hagen","Goroka","Madang"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="destination" className="text-xs font-bold tracking-wider uppercase text-black">Destination <span className="text-red-500">*</span></label>
            <select id="destination" name="destination" required className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all">
              <option value="">Select Arrival</option>
              {["Port Moresby","Lae (City Center)","Mt Hagen (Mine Site)","Porerga","Hides LNG"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="transit_date" className="text-xs font-bold tracking-wider uppercase text-black">Transit Date & Time <span className="text-red-500">*</span></label>
            <input type="datetime-local" id="transit_date" name="transit_date" required className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
          </div>
        </div>
      </fieldset>

      {/* Section 2 */}
      <fieldset className="flex flex-col gap-6">
        <legend className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">02</span>
          <h2 className="text-lg font-semibold text-black">Escort Requirements</h2>
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-wider uppercase text-black">Personnel Level</p>
            {[["armed","Armed Security Personnel","Standard high-risk highway protection"],["unarmed","Unarmed Logistical Escort","Route scouting and technical support"],["vip","VIP Close Protection","Executive transit with dedicated PSD team"]].map(([val,title,desc]) => (
              <label key={val} className="flex items-start p-4 border border-[#E2E8F0] rounded-xl cursor-pointer hover:bg-gray-50 has-[:checked]:border-black has-[:checked]:bg-gray-50 has-[:checked]:ring-1 has-[:checked]:ring-black transition-all">
                <input type="radio" name="personnel" value={val} defaultChecked={val==="armed"} className="w-5 h-5 mt-0.5 accent-black shrink-0" />
                <div className="ml-4">
                  <p className="text-xs font-bold tracking-wider text-black">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </label>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-wider uppercase text-black">Vehicle Requirements</p>
            {[["armored-suv","Armored SUV (B6 Level)","Ballistic protection for personnel"],["4x4-support","Standard 4x4 Support","High-clearance patrol vehicles"],["logistics-truck","Logistics Support Truck","Heavy mechanical recovery vehicle"]].map(([val,title,desc]) => (
              <label key={val} className="flex items-start p-4 border border-[#E2E8F0] rounded-xl cursor-pointer hover:bg-gray-50 has-[:checked]:border-black has-[:checked]:bg-gray-50 has-[:checked]:ring-1 has-[:checked]:ring-black transition-all">
                <input type="checkbox" name="vehicle" value={val} defaultChecked={val==="armored-suv"} className="w-5 h-5 mt-0.5 rounded accent-black shrink-0" />
                <div className="ml-4">
                  <p className="text-xs font-bold tracking-wider text-black">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Section 3 */}
      <fieldset className="flex flex-col gap-6">
        <legend className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">03</span>
          <h2 className="text-lg font-semibold text-black">Cargo & Personnel</h2>
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="passengers" className="text-xs font-bold tracking-wider uppercase text-black">No. of Passengers</label>
            <input type="number" id="passengers" name="passengers" min="1" max="100" defaultValue="1" className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cargo_type" className="text-xs font-bold tracking-wider uppercase text-black">Cargo Type</label>
            <select id="cargo_type" name="cargo_type" className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all">
              {["General Goods","High Value Assets","Sensitive Documents","Mine Site Equipment","No Cargo (Personnel Only)"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cargo_value" className="text-xs font-bold tracking-wider uppercase text-black">Est. Value (PGK)</label>
            <input type="text" id="cargo_value" name="cargo_value" placeholder="e.g. 50,000" className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
          </div>
        </div>
      </fieldset>

      {/* Section 4 */}
      <fieldset className="flex flex-col gap-6">
        <legend className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">04</span>
          <h2 className="text-lg font-semibold text-black">Contact Information</h2>
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-bold tracking-wider uppercase text-black">Corporate Email <span className="text-red-500">*</span></label>
            <input type="email" id="email" name="email" required placeholder="manager@enterprise.com.pg" autoComplete="email" className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs font-bold tracking-wider uppercase text-black">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" id="phone" name="phone" required placeholder="+675 XXXX XXXX" autoComplete="tel" className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="notes" className="text-xs font-bold tracking-wider uppercase text-black">Special Instructions</label>
            <textarea id="notes" name="notes" rows={4} placeholder="Detail any specific security risks, required route deviations, or special load handling instructions..." className="w-full p-3 bg-[#f2f4f6] border border-[#E2E8F0] rounded-lg text-sm font-medium focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none" />
          </div>
        </div>
      </fieldset>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#E2E8F0] gap-6">
        <div className="flex items-center gap-4 text-gray-500">
          <span className="material-symbols-outlined icon-fill text-3xl text-[#15803D]">shield</span>
          <div>
            <p className="text-xs font-bold tracking-wider text-black">SECURE TRANSMISSION</p>
            <p className="text-xs text-gray-500">Your data is encrypted and sent directly to Aimop Hires dispatch.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full md:w-auto px-12 py-4 bg-[#fed01b] text-black rounded-lg text-xs font-bold tracking-wider hover:brightness-110 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
          {pending ? (
            <><span className="material-symbols-outlined animate-spin">sync</span>PROCESSING...</>
          ) : (
            "SUBMIT QUOTE REQUEST"
          )}
        </button>
      </div>
    </form>
  );
}
