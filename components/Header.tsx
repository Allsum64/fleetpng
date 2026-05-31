"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/directory", label: "Hires" },
  { href: "/directory?services=airport-transfer", label: "Transfers" },
  { href: "/directory?services=escort", label: "Escorts" },
  { href: "/rates", label: "Rates" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white border-b border-[#E2E8F0] shadow-sm"
      }`}
    >
      <nav className="flex justify-between items-center px-4 md:px-10 h-20 w-full max-w-[1280px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors ${transparent ? "text-white" : "text-black"}`}
          >
            Fleet<span className="text-[#fed01b]">PNG</span>
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  transparent
                    ? "text-white/90 hover:text-white"
                    : "text-gray-500 hover:text-black"
                } ${pathname === l.href.split("?")[0] && !transparent ? "text-black font-semibold border-b-2 border-black pb-1" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className="hidden lg:block text-xs font-bold tracking-wider px-4 py-2 border rounded transition-all border-white/60 text-white hover:bg-white hover:text-black"
            style={transparent ? {} : { borderColor: "#000", color: "#000", background: "transparent" }}
          >
            LIST YOUR FLEET
          </Link>
          <Link
            href="/quote"
            className="bg-[#fed01b] text-black text-xs font-bold tracking-wider px-5 py-2.5 rounded-lg hover:brightness-110 transition-all shadow-md"
          >
            GET QUOTE
          </Link>
          {/* Mobile burger */}
          <button
            className={`md:hidden p-2 transition-colors ${transparent ? "text-white" : "text-black"}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 text-white border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/90 font-medium py-2 border-b border-white/10"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="mt-2 bg-[#fed01b] text-black text-center font-bold text-xs tracking-wider py-3 rounded-lg"
            onClick={() => setMenuOpen(false)}
          >
            GET QUOTE
          </Link>
        </div>
      )}
    </header>
  );
}
