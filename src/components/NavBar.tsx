"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/loans", label: "Loans" },
    { href: "/insurance", label: "Insurance" },
    { href: "/partners", label: "For Partners" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="flex items-center justify-between h-[70px] md:h-[80px] px-4 sm:px-8 lg:px-[120px] bg-[var(--bg-white)] w-full relative">
      <Link href="/" className="text-[20px] md:text-[24px] font-bold text-[var(--text-primary)]">
        Qazina
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[14px] lg:text-[16px] font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors ${
              pathname === link.href ? "font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/loans"
          className="flex items-center justify-center px-4 lg:px-6 py-2.5 lg:py-3 bg-[var(--lime)] rounded-[10px] lg:rounded-[12px] text-[14px] lg:text-[16px] font-semibold text-[var(--text-primary)] hover:bg-[var(--lime-hover)] transition-colors"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[var(--text-primary)]" />
        ) : (
          <Menu className="w-6 h-6 text-[var(--text-primary)]" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 right-0 bg-white border-t border-[var(--border-default)] shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-[16px] font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors py-3 px-4 rounded-lg hover:bg-[var(--bg-cream)] ${
                  pathname === link.href ? "font-semibold bg-[var(--bg-cream)]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/loans"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center px-6 py-3 mt-2 bg-[var(--lime)] rounded-[12px] text-[16px] font-semibold text-[var(--text-primary)] hover:bg-[var(--lime-hover)] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
