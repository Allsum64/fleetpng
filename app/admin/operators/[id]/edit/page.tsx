import Link from "next/link";

// Edit page — coming soon placeholder
// Full edit functionality can be added in the Option B upgrade
export default function EditOperatorPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[60vh]">
      <span className="material-symbols-outlined text-6xl text-gray-700 mb-4">
        construction
      </span>
      <h1 className="text-2xl font-bold text-white mb-2">Edit Coming Soon</h1>
      <p className="text-gray-400 text-sm mb-6 text-center max-w-md">
        To edit operator #{params.id}, go to{" "}
        <strong className="text-white">Supabase → Table Editor</strong> and
        update the relevant rows directly. Full in-app editing will be added in
        the Option B upgrade.
      </p>
      <Link
        href="/admin/operators"
        className="flex items-center gap-2 text-[#fed01b] font-bold text-sm hover:underline"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Back to Operators
      </Link>
    </div>
  );
}
