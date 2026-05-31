"use server";
import { createAdminClient } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type OperatorFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
} | null;

export async function createOperator(
  _prev: OperatorFormState,
  formData: FormData
): Promise<OperatorFormState> {
  const supabase = createAdminClient();

  // ── 1. Validate required fields ──────────────────────────────────────────
  const required: Record<string, string> = {
    brand_name: "Brand name",
    company_name: "Legal company name",
    main_phone: "Main phone",
    primary_email: "Primary email",
  };
  const fieldErrors: Record<string, string> = {};
  for (const [key, label] of Object.entries(required)) {
    if (!formData.get(key)) fieldErrors[key] = `${label} is required`;
  }
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  // ── 2. Insert operator ────────────────────────────────────────────────────
  const { data: op, error: opErr } = await supabase
    .from("operators")
    .insert({
      company_name: formData.get("company_name") as string,
      brand_name: formData.get("brand_name") as string,
      ipa_verified: formData.get("ipa_verified") === "true",
      tin_number: (formData.get("tin_number") as string) || null,
      main_phone: formData.get("main_phone") as string,
      whatsapp_phone: (formData.get("whatsapp_phone") as string) || null,
      primary_email: formData.get("primary_email") as string,
      sales_email: (formData.get("sales_email") as string) || null,
      operating_hours_weekday:
        (formData.get("operating_hours_weekday") as string) || null,
      operating_hours_friday:
        (formData.get("operating_hours_friday") as string) || null,
      operating_hours_sunday:
        (formData.get("operating_hours_sunday") as string) || null,
      is_premium: formData.get("is_premium") === "on",
      hero_image_url: (formData.get("hero_image_url") as string) || null,
      logo_url: (formData.get("logo_url") as string) || null,
    })
    .select()
    .single();

  if (opErr || !op) return { error: opErr?.message ?? "Failed to save operator" };

  const operatorId = op.id;

  // ── 3. Insert branches ────────────────────────────────────────────────────
  const branchesJson = formData.get("branches_json") as string;
  if (branchesJson) {
    const branches = JSON.parse(branchesJson) as {
      region: string;
      address: string;
      po_box: string;
    }[];
    const validBranches = branches.filter((b) => b.region && b.address);
    if (validBranches.length > 0) {
      const { error: brErr } = await supabase.from("operator_branches").insert(
        validBranches.map((b) => ({
          operator_id: operatorId,
          province_region: b.region,
          physical_address: b.address,
          po_box: b.po_box || null,
        }))
      );
      if (brErr) return { error: `Branch insert failed: ${brErr.message}` };
    }
  }

  // ── 4. Insert fleet vehicles ──────────────────────────────────────────────
  const vehiclesJson = formData.get("vehicles_json") as string;
  if (vehiclesJson) {
    const vehicles = JSON.parse(vehiclesJson) as {
      category: string;
      model: string;
      seats: string;
      daily: string;
      city: string;
      outside: string;
      image_url: string;
    }[];
    const validVehicles = vehicles.filter((v) => v.category && v.model);
    if (validVehicles.length > 0) {
      const { error: vErr } = await supabase.from("fleet_inventory").insert(
        validVehicles.map((v) => ({
          operator_id: operatorId,
          vehicle_category: v.category,
          vehicle_model: v.model,
          capacity_seats: v.seats ? parseInt(v.seats) : null,
          daily_rate_kina: v.daily ? parseFloat(v.daily) : null,
          hourly_rate_city: v.city ? parseFloat(v.city) : null,
          hourly_rate_outside: v.outside ? parseFloat(v.outside) : null,
          image_url: v.image_url || null,
        }))
      );
      if (vErr) return { error: `Vehicle insert failed: ${vErr.message}` };
    }
  }

  // ── 5. Insert specialized services ───────────────────────────────────────
  await supabase.from("specialized_services").insert({
    operator_id: operatorId,
    has_airport_transfer: formData.get("has_airport_transfer") === "on",
    has_corporate_pickup: formData.get("has_corporate_pickup") === "on",
    has_escort_service: formData.get("has_escort_service") === "on",
    has_water_cart: formData.get("has_water_cart") === "on",
    has_car_dealership: formData.get("has_car_dealership") === "on",
  });

  revalidatePath("/admin/operators");
  revalidatePath("/directory");
  redirect("/admin/operators");
}

export async function deleteOperator(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("operators").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/operators");
  revalidatePath("/directory");
}
