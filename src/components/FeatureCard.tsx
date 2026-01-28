import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 w-[280px]">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-14 h-14 bg-[var(--bg-lime-tint)] rounded-[14px]">
        <Icon className="w-7 h-7 text-[var(--text-primary)]" />
      </div>

      {/* Title */}
      <span className="text-[18px] font-semibold text-[var(--text-primary)] text-center">
        {title}
      </span>

      {/* Description */}
      <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5] text-center w-[232px]">
        {description}
      </p>
    </div>
  );
}
