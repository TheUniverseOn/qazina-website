import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-12 bg-[var(--lime-dark)] px-[120px] py-[80px] w-full">
      {/* Top Section */}
      <div className="flex justify-between w-full">
        {/* Brand Column */}
        <div className="flex flex-col gap-4 w-[300px]">
          <span className="text-[24px] font-bold text-white">Qazina</span>
          <p className="text-[14px] text-[var(--text-tertiary)] leading-[1.6]">
            The marketplace for business loans and insurance in Ethiopia.
          </p>
        </div>

        {/* Links Container */}
        <div className="flex gap-20">
          {/* Products Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[14px] font-semibold text-[var(--text-tertiary)]">Products</span>
            <Link href="/loans" className="text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Business Loans
            </Link>
            <Link href="/insurance" className="text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Business Insurance
            </Link>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[14px] font-semibold text-[var(--text-tertiary)]">Company</span>
            <Link href="/about" className="text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              Careers
            </Link>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[14px] font-semibold text-[var(--text-tertiary)]">Connect</span>
            <a href="mailto:hello@theqazina.com" className="text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              hello@theqazina.com
            </a>
            <a href="tel:+251111234567" className="text-[14px] text-white hover:text-[var(--lime)] transition-colors">
              +251 11 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#333333]" />

      {/* Bottom Section */}
      <div className="flex items-center justify-between w-full">
        <span className="text-[14px] text-[var(--text-secondary)]">
          © 2025 Qazina. All rights reserved.
        </span>
        <div className="flex gap-6">
          <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-[14px] text-[var(--text-secondary)] hover:text-white transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
