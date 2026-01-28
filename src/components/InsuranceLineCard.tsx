import { LucideIcon } from "lucide-react";

interface InsuranceLineCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function InsuranceLineCard({ icon: Icon, title, description }: InsuranceLineCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 w-[200px] border border-[var(--border-default)] rounded-[16px]">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-12 h-12 bg-[var(--bg-lime-tint)] rounded-[12px]">
        <Icon className="w-6 h-6 text-[var(--text-primary)]" />
      </div>

      {/* Title */}
      <span className="text-[16px] font-semibold text-[var(--text-primary)] text-center">
        {title}
      </span>

      {/* Description */}
      <span className="text-[14px] text-[var(--text-secondary)] text-center">
        {description}
      </span>
    </div>
  );
}
