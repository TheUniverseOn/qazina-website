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
    <div className="flex flex-col gap-6 p-10 bg-white rounded-[24px] border border-[var(--border-light)] w-[540px]">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-16 h-16 bg-[var(--bg-lime-tint)] rounded-[16px]">
        <Icon className="w-8 h-8 text-[var(--text-primary)]" />
      </div>

      {/* Category */}
      <span className="text-[24px] font-semibold text-[var(--text-primary)]">
        {category}
      </span>

      {/* Description */}
      <p className="text-[16px] text-[var(--text-secondary)] leading-[1.6] w-[460px]">
        {description}
      </p>

      {/* Bullets */}
      <div className="flex flex-col gap-3 w-full">
        {bullets.map((bullet, index) => (
          <div key={index} className="flex items-center gap-[10px]">
            <Check className="w-4 h-4 text-[var(--success)]" />
            <span className="text-[14px] text-[var(--text-secondary)]">{bullet}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href={ctaHref}
        className="flex items-center justify-center gap-2 w-full h-[52px] bg-[var(--lime)] rounded-[12px] text-[16px] font-semibold text-[var(--text-primary)] hover:bg-[var(--lime-hover)] transition-colors"
      >
        {ctaText}
        <ArrowRight className="w-[18px] h-[18px]" />
      </Link>
    </div>
  );
}
