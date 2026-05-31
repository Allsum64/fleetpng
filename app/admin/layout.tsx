import Link from "next/link";
import { adminLogout } from "./login/actions";

const navLinks = [
  { href: "/admin/operators", icon: "directions_car", label: "Operators" },
  { href: "/admin/operators/new", icon: "add_circle", label: "Add Operator" },
  { href: "/admin/quotes", icon: "inbox", label: "Quote Requests" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 border-r border-gray-800 fixed h-full z-40">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <Link href="/admin/operators" className="text-lg font-bold text-white">
            Fleet<span className="text-[#fed01b]">PNG</span>
          </Link>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all text-sm font-medium group"
            >
              <span className="material-symbols-outlined text-base group-hover:text-[#fed01b] transition-colors">
                {l.icon}
              </span>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all text-sm font-medium"
          >
            <span className="material-symbols-outlined text-base">
              open_in_new
            </span>
            View Site
          </Link>
          <form action={adminLogout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-900/40 hover:text-red-400 transition-all text-sm font-medium"
            >
              <span className="material-symbols-outlined text-base">
                logout
              </span>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 w-full bg-gray-900 border-b border-gray-800 z-40 flex items-center justify-between px-4 h-14">
        <Link href="/admin/operators" className="text-base font-bold text-white">
          Fleet<span className="text-[#fed01b]">PNG</span>{" "}
          <span className="text-gray-500 font-normal text-sm">Admin</span>
        </Link>
        <div className="flex gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
              title={l.label}
            >
              <span className="material-symbols-outlined text-lg">{l.icon}</span>
            </Link>
          ))}
          <form action={adminLogout}>
            <button
              type="submit"
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-56 mt-14 md:mt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
