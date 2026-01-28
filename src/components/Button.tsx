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
  const baseStyles = "flex items-center justify-center gap-2 font-semibold text-[14px] md:text-[16px] transition-colors";

  const variantStyles = {
    primary: "px-5 md:px-8 py-3 md:py-4 bg-[var(--lime)] rounded-[10px] md:rounded-[12px] border-[1.5px] border-[var(--lime)] text-[var(--text-primary)] hover:bg-[var(--lime-hover)] hover:border-[var(--lime-hover)]",
    secondary: "px-5 md:px-8 py-3 md:py-4 rounded-[10px] md:rounded-[12px] border-[1.5px] border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-cream)]",
    ghost: "gap-[6px] font-medium text-[var(--text-primary)] hover:text-[var(--text-secondary)]",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && (Icon ? <Icon className="w-4 h-4 md:w-[18px] md:h-[18px]" /> : <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px]" />)}
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
