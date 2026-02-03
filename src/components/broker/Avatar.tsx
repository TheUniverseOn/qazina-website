"use client";

import { User } from "lucide-react";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; icon: number; text: string }> = {
  sm: { container: "w-6 h-6", icon: 14, text: "text-xs" },
  md: { container: "w-9 h-9", icon: 18, text: "text-sm" },
  lg: { container: "w-12 h-12", icon: 24, text: "text-base" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ src, name, size = "md", className = "" }: AvatarProps) {
  const styles = sizeStyles[size];

  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={`${styles.container} rounded-full object-cover ${className}`}
      />
    );
  }

  if (name) {
    return (
      <div
        className={`${styles.container} rounded-full bg-[var(--accent-primary)] flex items-center justify-center ${styles.text} font-medium text-[var(--accent-text)] ${className}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} rounded-full bg-[var(--bg-divider)] flex items-center justify-center text-[var(--text-tertiary)] ${className}`}
    >
      <User size={styles.icon} />
    </div>
  );
}
