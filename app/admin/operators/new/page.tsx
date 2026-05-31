import Link from "next/link";
import OperatorForm from "@/components/admin/OperatorForm";

export default function NewOperatorPage() {
  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/operators"
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
          title="Back to operators"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Operator</h1>
          <p className="text-gray-400 text-sm mt-1">
            Fill in all 4 sections — the operator appears on the public site
            immediately after saving.
          </p>
        </div>
      </div>

      <OperatorForm />
    </div>
  );
}
