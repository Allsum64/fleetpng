"use client";
import { useActionState } from "react";
import { adminLogin, LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    adminLogin,
    null
  );

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Fleet<span className="text-[#fed01b]">PNG</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Admin Panel</p>
        </div>

        <form
          action={action}
          className="bg-gray-900 border border-gray-800 rounded-xl p-8 space-y-6"
        >
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Sign in
            </h2>
            <p className="text-gray-400 text-xs">
              Enter your admin password to continue.
            </p>
          </div>

          {state?.error && (
            <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-bold tracking-wider uppercase text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-[#fed01b] focus:ring-1 focus:ring-[#fed01b] outline-none transition-all"
              placeholder="Enter admin password"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 bg-[#fed01b] text-black font-bold text-sm tracking-wider rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {pending ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">
                  sync
                </span>
                SIGNING IN...
              </>
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          FleetPNG Admin · Restricted Access
        </p>
      </div>
    </div>
  );
}
