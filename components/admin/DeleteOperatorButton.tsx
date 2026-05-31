"use client";
import { deleteOperator } from "@/app/admin/operators/actions";

export default function DeleteOperatorButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  async function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteOperator(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all"
      title="Delete"
    >
      <span className="material-symbols-outlined text-base">delete</span>
    </button>
  );
}
