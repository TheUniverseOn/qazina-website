"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  badge,
  actions,
}: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-[var(--bg-border)] px-4 py-4 sm:px-6 md:px-8 md:py-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-sm text-[var(--text-secondary)] mb-3 md:mb-4 overflow-x-auto">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1 whitespace-nowrap">
              {index > 0 && <ChevronRight size={14} className="text-[var(--text-tertiary)]" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] truncate">{title}</h1>
          {badge}
        </div>
        {actions && <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">{actions}</div>}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{subtitle}</p>
      )}
    </header>
  );
}
