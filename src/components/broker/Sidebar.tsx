"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Shield,
  FileCheck,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { Avatar } from "./Avatar";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: "Inbox", href: "/broker", icon: <LayoutDashboard size={20} /> },
  { label: "Proposals", href: "/broker/proposals", icon: <FileText size={20} /> },
  { label: "Policies", href: "/broker/policies", icon: <Shield size={20} /> },
  { label: "Endorsements", href: "/broker/endorsements", icon: <FileCheck size={20} /> },
  { label: "Certificates", href: "/broker/certificates", icon: <FileText size={20} /> },
  { label: "Claims", href: "/broker/claims", icon: <FileText size={20} /> },
  { label: "Billing", href: "/broker/billing", icon: <CreditCard size={20} /> },
];

const bottomNavItems: NavItem[] = [
  { label: "Settings", href: "/broker/settings", icon: <Settings size={20} /> },
  { label: "Help", href: "/broker/help", icon: <HelpCircle size={20} /> },
];

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function Sidebar({ user = { name: "Eve Broker", email: "eve@broker.com" } }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/broker") {
      return pathname === "/broker";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-md flex items-center justify-center">
            <span className="text-sm font-bold text-[var(--accent-text)]">Q</span>
          </div>
          <span className="text-lg font-semibold text-[var(--text-primary)]">Qazina</span>
          <span className="px-1.5 py-0.5 bg-[var(--bg-divider)] rounded text-[10px] font-medium text-[var(--text-secondary)]">
            BROKER
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 h-[var(--nav-item-height)] px-3 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive(item.href)
                      ? "bg-[var(--bg-divider)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <span className={isActive(item.href) ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}>
                  {item.icon}
                </span>
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-[var(--status-error)] text-white text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-2 space-y-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 h-[var(--nav-item-height)] px-3 rounded-md text-sm font-medium transition-colors
              ${
                isActive(item.href)
                  ? "bg-[var(--bg-divider)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              }`}
          >
            <span className={isActive(item.href) ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}

        {/* Divider */}
        <div className="h-px bg-[var(--bg-border)] my-2" />

        {/* User Profile */}
        <div className="flex items-center gap-3 py-3">
          <Avatar name={user.name} src={user.avatar} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
            <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 py-3 bg-white border-b border-[var(--bg-border)]">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[var(--accent-primary)] rounded-md flex items-center justify-center">
            <span className="text-xs font-bold text-[var(--accent-text)]">Q</span>
          </div>
          <span className="text-base font-semibold text-[var(--text-primary)]">Qazina</span>
          <span className="px-1.5 py-0.5 bg-[var(--bg-divider)] rounded text-[10px] font-medium text-[var(--text-secondary)]">
            BROKER
          </span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-[280px] bg-white border-r border-[var(--bg-border)] flex flex-col transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[var(--sidebar-width)] h-screen bg-white border-r border-[var(--bg-border)] flex-col">
        {sidebarContent}
      </aside>
    </>
  );
}
