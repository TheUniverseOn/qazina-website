import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 p-4 md:p-6 w-full sm:w-[160px] md:w-[200px] lg:w-[280px]">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[var(--bg-lime-tint)] rounded-[12px] md:rounded-[14px]">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-[var(--text-primary)]" />
      </div>

      {/* Title */}
      <span className="text-[16px] md:text-[18px] font-semibold text-[var(--text-primary)] text-center">
        {title}
      </span>

      {/* Description */}
      <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-[1.5] text-center">
        {description}
      </p>
    </div>
  );
}
