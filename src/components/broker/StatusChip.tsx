"use client";

import { ReactNode } from "react";

type ChipVariant = "success" | "warning" | "error" | "info" | "neutral";

interface StatusChipProps {
  variant: ChipVariant;
  children: ReactNode;
  icon?: ReactNode;
}

const variantStyles: Record<ChipVariant, string> = {
  success: "bg-[var(--status-success-bg)] text-[var(--status-success)]",
  warning: "bg-[var(--status-warning-bg)] text-[var(--status-warning)]",
  error: "bg-[var(--status-error-bg)] text-[var(--status-error)]",
  info: "bg-[var(--status-info-bg)] text-[var(--status-info)]",
  neutral: "bg-[var(--status-neutral-bg)] text-[var(--status-neutral)]",
};

export function StatusChip({ variant, children, icon }: StatusChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${variantStyles[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}
