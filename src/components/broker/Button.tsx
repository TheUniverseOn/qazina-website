"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent-primary)] text-[var(--accent-text)] hover:bg-[var(--accent-hover)] border-transparent",
  secondary:
    "bg-white text-[var(--text-primary)] border-[var(--bg-border)] hover:bg-[var(--bg-surface)]",
  ghost:
    "bg-transparent text-[var(--text-primary)] border-transparent hover:bg-[var(--bg-surface)]",
  destructive:
    "bg-[var(--status-error)] text-white border-transparent hover:bg-[var(--status-error)]/90",
  danger:
    "bg-[var(--status-error)] text-white border-transparent hover:bg-[var(--status-error)]/90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-[var(--button-height-md)] px-4 text-sm gap-2",
  lg: "h-[var(--button-height-lg)] px-6 text-base gap-2",
};

export const BrokerButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      isLoading,
      fullWidth,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-medium rounded-[var(--radius-md)] border
          transition-colors duration-150 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);
BrokerButton.displayName = "BrokerButton";
