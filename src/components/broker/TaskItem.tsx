"use client";

import { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { StatusChip } from "./StatusChip";

interface TaskItemProps {
  title: string;
  subtitle?: string;
  status?: "overdue" | "due-today" | "due-tomorrow" | "upcoming";
  dueDate?: string;
  isCompleted?: boolean;
  onComplete?: () => void;
  onClick?: () => void;
  badge?: ReactNode;
}

const statusConfig = {
  overdue: { label: "Overdue", variant: "error" as const },
  "due-today": { label: "Due: Today", variant: "warning" as const },
  "due-tomorrow": { label: "Due: Tomorrow", variant: "info" as const },
  upcoming: { label: "Upcoming", variant: "neutral" as const },
};

export function TaskItem({
  title,
  subtitle,
  status,
  dueDate,
  isCompleted = false,
  onComplete,
  onClick,
  badge,
}: TaskItemProps) {
  const statusInfo = status ? statusConfig[status] : null;

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-3 sm:p-4 rounded-[var(--radius-md)] border transition-colors
        ${isCompleted
          ? "bg-[var(--bg-surface)] border-[var(--bg-border)]"
          : status === "overdue"
            ? "bg-[var(--status-error-bg)] border-[var(--status-error)]/30"
            : "bg-white border-[var(--bg-border)] hover:border-[var(--bg-border)]"
        }
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete?.();
        }}
        className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-colors
          ${isCompleted
            ? "bg-[var(--status-success)] border-[var(--status-success)] text-white"
            : "border-[var(--bg-border)] hover:border-[var(--accent-primary)]"
          }`}
      >
        {isCompleted && <CheckCircle2 size={14} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${isCompleted ? "text-[var(--text-tertiary)] line-through" : "text-[var(--text-primary)]"}`}>
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
        )}
        {/* Badge + Status on mobile: below content */}
        {!isCompleted && (badge || statusInfo) && (
          <div className="flex items-center gap-2 mt-2 sm:hidden flex-wrap">
            {badge}
            {statusInfo && (
              <StatusChip variant={statusInfo.variant}>
                {dueDate || statusInfo.label}
              </StatusChip>
            )}
          </div>
        )}
      </div>

      {/* Badge - desktop only */}
      {badge && !isCompleted && (
        <div className="flex-shrink-0 hidden sm:block">{badge}</div>
      )}

      {/* Status/Due - desktop only */}
      <div className="flex-shrink-0 hidden sm:block">
        {statusInfo && !isCompleted && (
          <StatusChip variant={statusInfo.variant}>
            {dueDate || statusInfo.label}
          </StatusChip>
        )}
      </div>
    </div>
  );
}
