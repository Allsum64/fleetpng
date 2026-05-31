"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/directory", icon: "search", label: "Explore" },
  { href: "/rates", icon: "receipt_long", label: "Rates" },
  { href: "/quote", icon: "mail", label: "Quote" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-[#E2E8F0] flex items-center justify-around z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex flex-col items-center gap-1 ${active ? "text-black" : "text-gray-400"}`}
            aria-current={active ? "page" : undefined}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {t.icon}
            </span>
            <span className="text-[10px] font-bold">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
