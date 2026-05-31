"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function hashToken(password: string): Promise<string> {
  const encoded = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export type LoginState = { error?: string } | null;

export async function adminLogin(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password") as string;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Incorrect password. Try again." };
  }

  const token = await hashToken(process.env.ADMIN_PASSWORD!);
  const cookieStore = await cookies();

  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  redirect("/admin/operators");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
