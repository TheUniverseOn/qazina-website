"use client";

import { Inbox, AlertCircle, Loader2 } from "lucide-react";
import { BrokerButton } from "./Button";

// Empty State Component
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-8">
      <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] flex items-center justify-center">
        {icon || <Inbox size={28} className="text-[var(--text-tertiary)]" />}
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--text-secondary)] max-w-[300px]">{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <BrokerButton variant="primary" onClick={onAction}>
          {actionLabel}
        </BrokerButton>
      )}
    </div>
  );
}

// Loading State Component
interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-8">
      <Loader2 size={40} className="text-[var(--text-tertiary)] animate-spin" />
      <p className="text-sm text-[var(--text-secondary)]">{message}</p>
    </div>
  );
}

// Error State Component
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again or contact support",
  onRetry,
  retryLabel = "Try Again",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-8">
      <div className="w-16 h-16 rounded-full bg-[var(--status-error-bg)] flex items-center justify-center">
        <AlertCircle size={28} className="text-[var(--status-error)]" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-[300px]">{message}</p>
      </div>
      {onRetry && (
        <BrokerButton variant="secondary" onClick={onRetry}>
          {retryLabel}
        </BrokerButton>
      )}
    </div>
  );
}

// Success State Component
interface SuccessStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SuccessState({
  title = "Success!",
  message,
  actionLabel,
  onAction,
}: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-8">
      <div className="w-16 h-16 rounded-full bg-[var(--status-success-bg)] flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--status-success)]"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        {message && (
          <p className="text-sm text-[var(--text-secondary)] max-w-[300px]">{message}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <BrokerButton variant="primary" onClick={onAction}>
          {actionLabel}
        </BrokerButton>
      )}
    </div>
  );
}

// Skeleton Loading for tables
export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex gap-4 px-6 py-4 border-b border-[var(--bg-border)] bg-[var(--bg-surface)]">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-[var(--bg-divider)] rounded flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 px-6 py-4 border-b border-[var(--bg-border)]">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-4 bg-[var(--bg-surface)] rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--bg-border)] p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-5 bg-[var(--bg-surface)] rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-[var(--bg-surface)] rounded w-full" />
          <div className="h-4 bg-[var(--bg-surface)] rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
