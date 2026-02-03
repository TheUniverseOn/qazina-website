"use client";

import { ReactNode } from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "warning" | "success" | "error";
  className?: string;
}

const variantStyles = {
  default: "bg-white",
  warning: "bg-[var(--status-warning-bg)]",
  success: "bg-[var(--status-success-bg)]",
  error: "bg-[var(--status-error-bg)]",
};

const valueVariantStyles = {
  default: "text-[var(--text-primary)]",
  warning: "text-[var(--status-warning)]",
  success: "text-[var(--status-success)]",
  error: "text-[var(--status-error)]",
};

export function KPICard({
  label,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
  className = "",
}: KPICardProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-3 sm:p-5 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="space-y-1 min-w-0">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] truncate">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl sm:text-3xl font-semibold ${valueVariantStyles[variant]}`}>
              {value}
            </span>
            {trend && (
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-[var(--status-success)]" : "text-[var(--status-error)]"
                }`}
              >
                {trend.isPositive ? "+" : ""}{trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-[var(--text-tertiary)]">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
