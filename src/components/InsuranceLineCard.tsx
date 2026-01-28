import { LucideIcon } from "lucide-react";

interface InsuranceLineCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function InsuranceLineCard({ icon: Icon, title, description }: InsuranceLineCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 w-[calc(50%-8px)] sm:w-[150px] md:w-[180px] lg:w-[200px] border border-[var(--border-default)] rounded-[12px] md:rounded-[16px]">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--bg-lime-tint)] rounded-[10px] md:rounded-[12px]">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)]" />
      </div>

      {/* Title */}
      <span className="text-[13px] md:text-[16px] font-semibold text-[var(--text-primary)] text-center">
        {title}
      </span>

      {/* Description */}
      <span className="text-[11px] md:text-[14px] text-[var(--text-secondary)] text-center">
        {description}
      </span>
    </div>
  );
}
