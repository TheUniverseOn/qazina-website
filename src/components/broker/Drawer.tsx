"use client";

import { useEffect, useCallback } from "react";
import { X, ArrowRight } from "lucide-react";
import { BrokerButton } from "./Button";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg";
  showViewMore?: boolean;
  onViewMore?: () => void;
  viewMoreLabel?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "md",
  showViewMore = false,
  onViewMore,
  viewMoreLabel = "View full details",
}: DrawerProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  const widthClasses = {
    sm: "w-full sm:w-[320px]",
    md: "w-full sm:w-[400px]",
    lg: "w-full sm:w-[480px]",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full ${widthClasses[width]} bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--bg-border)]">
            <h2 className="font-semibold text-[var(--text-primary)]">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto p-5">{children}</div>

          {/* View More Link */}
          {showViewMore && onViewMore && (
            <div className="px-5 py-3 border-t border-[var(--bg-border)]">
              <button
                onClick={onViewMore}
                className="flex items-center gap-1 text-sm text-[var(--accent-primary)] hover:underline font-medium"
              >
                {viewMoreLabel}
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div className="flex items-center gap-3 px-5 py-4 border-t border-[var(--bg-border)]">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Quick View Drawer variant with common info row pattern
interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-[var(--text-secondary)]">{label}</p>
      <p className="text-sm font-medium text-[var(--text-primary)]">{value}</p>
    </div>
  );
}

interface QuickViewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onViewMore?: () => void;
  viewMoreLabel?: string;
}

export function QuickViewDrawer({
  isOpen,
  onClose,
  title,
  children,
  actionLabel,
  onAction,
  onViewMore,
  viewMoreLabel,
}: QuickViewDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showViewMore={!!onViewMore}
      onViewMore={onViewMore}
      viewMoreLabel={viewMoreLabel}
      footer={
        actionLabel && onAction ? (
          <BrokerButton variant="primary" className="w-full" onClick={onAction}>
            {actionLabel}
          </BrokerButton>
        ) : undefined
      }
    >
      <div className="space-y-4">{children}</div>
    </Drawer>
  );
}
