import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-8 md:gap-12 bg-[var(--lime-dark)] px-4 sm:px-8 lg:px-[120px] py-12 md:py-[80px] w-full">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 w-full">
        {/* Brand Column */}
        <div className="flex flex-col gap-4 max-w-[300px]">
          <span className="text-[20px] md:text-[24px] font-bold text-white">Qazina</span>
          <p className="text-[14px] text-[var(--text-tertiary)] leading-[1.6]">
            The marketplace for business loans and insurance in Ethiopia.
          </p>
        </div>

        {/* Links Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
          {/* Products Column */}
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="text-[13px] md:text-[14px] font-semibold text-[var(--text-tertiary)]">Products</span>
            <Link href="/loans" className="text-[13px] md:text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Business Loans
            </Link>
            <Link href="/insurance" className="text-[13px] md:text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Business Insurance
            </Link>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="text-[13px] md:text-[14px] font-semibold text-[var(--text-tertiary)]">Company</span>
            <Link href="/about" className="text-[13px] md:text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-[13px] md:text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-[13px] md:text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Careers
            </Link>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-3 md:gap-4 col-span-2 sm:col-span-1">
            <span className="text-[13px] md:text-[14px] font-semibold text-[var(--text-tertiary)]">Connect</span>
            <a href="mailto:hello@theqazina.com" className="text-[13px] md:text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              hello@theqazina.com
            </a>
            <a href="tel:+251111234567" className="text-[13px] md:text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              +251 11 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#333333]" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)] text-center sm:text-left">
          © 2025 Qazina. All rights reserved.
        </span>
        <div className="flex gap-6">
          <Link href="#" className="text-[13px] md:text-[14px] text-[var(--text-secondary)] hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-[13px] md:text-[14px] text-[var(--text-secondary)] hover:text-white transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
