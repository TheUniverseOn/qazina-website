"use client";

import { ReactNode } from "react";

interface ActivityItemProps {
  icon?: ReactNode;
  iconColor?: "success" | "warning" | "error" | "info" | "neutral";
  title: string;
  description?: string;
  timestamp: string;
}

const iconColorStyles = {
  success: "bg-[var(--status-success-bg)] text-[var(--status-success)]",
  warning: "bg-[var(--status-warning-bg)] text-[var(--status-warning)]",
  error: "bg-[var(--status-error-bg)] text-[var(--status-error)]",
  info: "bg-[var(--status-info-bg)] text-[var(--status-info)]",
  neutral: "bg-[var(--bg-surface)] text-[var(--text-secondary)]",
};

export function ActivityItem({
  icon,
  iconColor = "neutral",
  title,
  description,
  timestamp,
}: ActivityItemProps) {
  return (
    <div className="flex gap-3 py-3">
      {/* Icon */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconColorStyles[iconColor]}`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text-primary)]">{title}</p>
        {description && (
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{description}</p>
        )}
        <p className="text-xs text-[var(--text-tertiary)] mt-1">{timestamp}</p>
      </div>
    </div>
  );
}
