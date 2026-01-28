import Link from "next/link";
import { LucideIcon, Check, ArrowRight } from "lucide-react";

interface ProductCardProps {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
}

export function ProductCard({
  icon: Icon,
  category,
  title,
  description,
  bullets,
  ctaText,
  ctaHref,
}: ProductCardProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-10 bg-white rounded-[16px] md:rounded-[24px] border border-[var(--border-light)] w-full md:w-[540px]">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[var(--bg-lime-tint)] rounded-[12px] md:rounded-[16px]">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-[var(--text-primary)]" />
      </div>

      {/* Category */}
      <span className="text-[20px] md:text-[24px] font-semibold text-[var(--text-primary)]">
        {category}
      </span>

      {/* Description */}
      <p className="text-[14px] md:text-[16px] text-[var(--text-secondary)] leading-[1.6]">
        {description}
      </p>

      {/* Bullets */}
      <div className="flex flex-col gap-2 md:gap-3 w-full">
        {bullets.map((bullet, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-[10px]">
            <Check className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
            <span className="text-[13px] md:text-[14px] text-[var(--text-secondary)]">{bullet}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className="flex items-center justify-center gap-2 w-full h-[44px] md:h-[52px] bg-[var(--lime)] rounded-[10px] md:rounded-[12px] text-[14px] md:text-[16px] font-semibold text-[var(--text-primary)] hover:bg-[var(--lime-hover)] transition-colors"
      >
        {ctaText}
        <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px]" />
      </Link>
    </div>
  );
}
