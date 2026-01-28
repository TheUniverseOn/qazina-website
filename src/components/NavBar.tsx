"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/loans", label: "Loans" },
    { href: "/insurance", label: "Insurance" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex items-center justify-between h-[80px] px-[120px] bg-[var(--bg-white)] w-full">
      <Link href="/" className="text-[24px] font-bold text-[var(--text-primary)]">
        Qazina
      </Link>
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[16px] font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors ${
              pathname === link.href ? "font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/loans"
          className="flex items-center justify-center px-6 py-3 bg-[var(--lime)] rounded-[12px] text-[16px] font-semibold text-[var(--text-primary)] hover:bg-[var(--lime-hover)] transition-colors"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
