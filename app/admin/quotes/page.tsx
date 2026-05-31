import { createAdminClient } from "@/lib/supabase-admin";

async function fetchQuotes() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending:   "bg-yellow-900/40 text-yellow-400 border-yellow-800",
    reviewed:  "bg-blue-900/40 text-blue-400 border-blue-800",
    completed: "bg-green-900/40 text-green-400 border-green-800",
  };
  return (
    <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase border ${styles[status] ?? styles.pending}`}>
      {status}
    </span>
  );
}

export default async function AdminQuotesPage() {
  const quotes = await fetchQuotes();

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Quote Requests</h1>
        <p className="text-gray-400 text-sm mt-1">
          {quotes.length} request{quotes.length !== 1 ? "s" : ""} received
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-700 block mb-4">
            inbox
          </span>
          <p className="text-gray-400 text-sm">No quote requests yet.</p>
          <p className="text-gray-600 text-xs mt-2">
            They will appear here when customers submit the quote form.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <StatusBadge status={q.status ?? "pending"} />
                    <span className="text-gray-500 text-xs">
                      {new Date(q.created_at).toLocaleString("en-PG", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold">
                    {q.origin} → {q.destination}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${q.contact_email}?subject=Re: FleetPNG Quote Request — ${q.origin} to ${q.destination}`}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-xs font-bold hover:bg-gray-700 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">mail</span>
                    Reply
                  </a>
                  {q.contact_phone && (
                    <a
                      href={`https://wa.me/${q.contact_phone.replace(/\D/g, "")}?text=Hi%2C+this+is+FleetPNG+regarding+your+quote+request+from+${q.origin}+to+${q.destination}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 bg-[#fed01b] text-black rounded-lg text-xs font-bold hover:brightness-110 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-800 pt-4">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Contact</p>
                  <p className="text-white font-medium">{q.contact_email}</p>
                  <p className="text-gray-400">{q.contact_phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Transit Date</p>
                  <p className="text-white">
                    {q.transit_date
                      ? new Date(q.transit_date).toLocaleDateString("en-PG", { dateStyle: "medium" })
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Personnel / Cargo</p>
                  <p className="text-white">{q.passengers ?? 1} passenger{(q.passengers ?? 1) !== 1 ? "s" : ""}</p>
                  <p className="text-gray-400 text-xs">{q.cargo_type ?? "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Security Level</p>
                  <p className="text-white capitalize">{q.personnel_level ?? "—"}</p>
                  {q.cargo_value && (
                    <p className="text-gray-400 text-xs">K {q.cargo_value}</p>
                  )}
                </div>
              </div>

              {/* Vehicle requirements */}
              {q.vehicle_requirements?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.vehicle_requirements.map((vr: string) => (
                    <span
                      key={vr}
                      className="px-2 py-1 bg-gray-800 border border-gray-700 text-gray-300 rounded text-[10px] font-bold uppercase"
                    >
                      {vr.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              )}

              {/* Special instructions */}
              {q.special_instructions && (
                <div className="mt-3 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-300">
                  <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">
                    Special Instructions
                  </span>
                  {q.special_instructions}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
