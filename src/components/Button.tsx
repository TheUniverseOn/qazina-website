import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  showArrow?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon: Icon,
  showArrow = true,
  className = "",
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 font-semibold text-[16px] transition-colors";

  const variantStyles = {
    primary: "px-8 py-4 bg-[var(--lime)] rounded-[12px] text-[var(--text-primary)] hover:bg-[var(--lime-hover)]",
    secondary: "px-8 py-4 rounded-[12px] border-[1.5px] border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-cream)]",
    ghost: "gap-[6px] font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)]",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && (Icon ? <Icon className="w-[18px] h-[18px]" /> : <ArrowRight className="w-[18px] h-[18px]" />)}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {content}
    </button>
  );
}
