import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#eceef0] border-t border-[#E2E8F0]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-10 py-12 max-w-[1280px] mx-auto">
        <div className="space-y-4">
          <Link href="/" className="text-lg font-bold text-black">
            Fleet<span className="text-[#735c00]">PNG</span>
          </Link>
          <p className="text-xs text-gray-600 leading-relaxed">
            Papua New Guinea's leading directory for verified transit and secure
            logistics solutions.
          </p>
          <div className="text-[11px] font-bold text-gray-500 tracking-wider">
            IPA VERIFIED #1-94420
          </div>
        </div>
        <nav aria-label="Services">
          <h4 className="text-xs font-bold mb-4 uppercase tracking-widest text-black">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              ["Port Moresby Hires", "/directory?regions=port-moresby"],
              ["Lae Transfers", "/directory?regions=lae"],
              ["Secure Escorts", "/directory?services=escort"],
              ["Corporate Accounts", "/quote"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-gray-600 hover:text-black transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <h4 className="text-xs font-bold mb-4 uppercase tracking-widest text-black">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            {["About Us", "Terms of Service", "Privacy Policy", "Contact Support"].map((l) => (
              <li key={l}>
                <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h4 className="text-xs font-bold mb-4 uppercase tracking-widest text-black">
            Contact
          </h4>
          <address className="not-italic text-xs text-gray-600 leading-relaxed mb-4">
            Level 3, Kina Bank Haus<br />
            Douglas St, Port Moresby<br />
            Papua New Guinea
          </address>
          <a
            href="tel:+67532100000"
            className="flex items-center gap-2 text-sm font-medium text-black hover:underline"
          >
            <span className="material-symbols-outlined text-base">phone</span>
            +675 321 0000
          </a>
        </div>
      </div>
      <div className="border-t border-gray-300 py-5 text-center px-4">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} FleetPNG. All rights reserved. IPA
          Verified Security. Papua New Guinea.
        </p>
      </div>
    </footer>
  );
}
