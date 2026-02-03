"use client";

import { createContext, useContext, useCallback, useState, useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const variantConfig: Record<ToastVariant, { icon: React.ReactNode; bg: string; border: string; text: string }> = {
  success: {
    icon: <CheckCircle2 size={18} />,
    bg: "bg-[#f0fdf4]",
    border: "border-[var(--status-success)]",
    text: "text-[var(--status-success)]",
  },
  error: {
    icon: <XCircle size={18} />,
    bg: "bg-[#fef2f2]",
    border: "border-[var(--status-error)]",
    text: "text-[var(--status-error)]",
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    bg: "bg-[#fffbeb]",
    border: "border-[var(--status-warning)]",
    text: "text-[var(--status-warning)]",
  },
  info: {
    icon: <Info size={18} />,
    bg: "bg-[#eff6ff]",
    border: "border-[var(--status-info)]",
    text: "text-[var(--status-info)]",
  },
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const config = variantConfig[toast.variant];

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border ${config.bg} ${config.border} shadow-lg animate-in slide-in-from-right`}
    >
      <span className={config.text}>{config.icon}</span>
      <p className="text-sm font-medium text-[var(--text-primary)] flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="p-0.5 rounded text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-[380px] max-w-[calc(100vw-2rem)]">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
