"use client";

import { ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = "" }: TabsProps) {
  return (
    <div className={`flex items-center gap-1 border-b border-[var(--bg-border)] overflow-x-auto scrollbar-hide ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap
            ${
              activeTab === tab.id
                ? "text-[var(--text-primary)] border-[var(--accent-primary)]"
                : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
            }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`ml-1.5 sm:ml-2 px-1.5 py-0.5 rounded text-xs
                ${
                  activeTab === tab.id
                    ? "bg-[var(--accent-primary)] text-[var(--accent-text)]"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
