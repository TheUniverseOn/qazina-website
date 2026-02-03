"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { BrokerButton } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "sm",
}: ModalProps) {
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

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-full max-w-[480px]",
    md: "w-full max-w-[520px]",
    lg: "w-full max-w-[640px]",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className={`${sizeClasses[size]} bg-white rounded-t-xl sm:rounded-xl shadow-2xl max-h-[90vh] overflow-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--bg-border)]">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
            {description && <p className="text-sm text-[var(--text-secondary)] mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--bg-border)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Confirmation Modal variant
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <BrokerButton variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </BrokerButton>
          <BrokerButton
            variant={variant === "destructive" ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </BrokerButton>
        </>
      }
    >
      <p className="text-[var(--text-secondary)]">{message}</p>
    </Modal>
  );
}

// Form Modal variant
interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: "primary" | "destructive" | "green";
  size?: "sm" | "md" | "lg";
}

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isLoading = false,
  variant = "primary",
  size = "md",
}: FormModalProps) {
  const buttonVariant = variant === "destructive" ? "danger" : "primary";
  const buttonStyle = variant === "green" ? { backgroundColor: "var(--status-success)", borderColor: "var(--status-success)" } : undefined;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      footer={
        <>
          <BrokerButton variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </BrokerButton>
          <BrokerButton variant={buttonVariant} onClick={onSubmit} disabled={isLoading} style={buttonStyle}>
            {isLoading ? "Processing..." : submitLabel}
          </BrokerButton>
        </>
      }
    >
      <div className="space-y-5">{children}</div>
    </Modal>
  );
}
