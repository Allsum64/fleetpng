import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";
import DeleteOperatorButton from "@/components/admin/DeleteOperatorButton";

async function fetchOperators() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("operators")
    .select(
      `id, brand_name, ipa_verified, is_premium, main_phone,
       branches:operator_branches(province_region),
       fleet:fleet_inventory(vehicle_model),
       services:specialized_services(has_escort_service, has_airport_transfer, has_water_cart)`
    )
    .order("is_premium", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export default async function AdminOperatorsPage() {
  const operators = await fetchOperators();

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Operators</h1>
          <p className="text-gray-400 text-sm mt-1">
            {operators.length} operator{operators.length !== 1 ? "s" : ""}{" "}
            listed
          </p>
        </div>
        <Link
          href="/admin/operators/new"
          className="flex items-center gap-2 bg-[#fed01b] text-black px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          ADD OPERATOR
        </Link>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {operators.length === 0 ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-gray-700 block mb-4">
              directions_car
            </span>
            <p className="text-gray-400 text-sm mb-4">No operators yet.</p>
            <Link
              href="/admin/operators/new"
              className="text-[#fed01b] text-sm font-bold hover:underline"
            >
              Add your first operator →
            </Link>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-800/50">
              <tr>
                {[
                  "Company",
                  "Regions",
                  "Fleet",
                  "Services",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-xs font-bold tracking-wider text-gray-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {operators.map((op) => {
                const regions = (op.branches ?? [])
                  .map((b: { province_region: string }) =>
                    b.province_region
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())
                  )
                  .join(", ");

                const vehicleCount = (op.fleet ?? []).length;
                const svc = op.services?.[0] ?? {};
                const serviceFlags = [
                  svc.has_airport_transfer && "Airport",
                  svc.has_escort_service && "Escort",
                  svc.has_water_cart && "Water",
                ]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <tr
                    key={op.id}
                    className="hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">
                        {op.brand_name}
                      </div>
                      {op.is_premium && (
                        <span className="text-[10px] text-[#fed01b] font-bold uppercase tracking-wider">
                          Premium
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-300">
                      {regions || (
                        <span className="text-gray-600 italic">None</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-300">
                      {vehicleCount} vehicle{vehicleCount !== 1 ? "s" : ""}
                    </td>
                    <td className="px-5 py-4 text-gray-300 text-xs">
                      {serviceFlags || (
                        <span className="text-gray-600 italic">None</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {op.ipa_verified ? (
                        <span className="inline-flex items-center gap-1 bg-green-900/50 text-green-400 px-2 py-1 rounded text-[10px] font-bold">
                          <span
                            className="material-symbols-outlined text-xs"
                            style={{
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            verified
                          </span>
                          IPA
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-yellow-900/40 text-yellow-400 px-2 py-1 rounded text-[10px] font-bold">
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/operator/${op.id}`}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-all"
                          title="View on site"
                        >
                          <span className="material-symbols-outlined text-base">
                            open_in_new
                          </span>
                        </Link>
                        <Link
                          href={`/admin/operators/${op.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-[#fed01b] hover:bg-gray-700 rounded transition-all"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                        </Link>
                        <DeleteOperatorButton id={op.id} name={op.brand_name} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
