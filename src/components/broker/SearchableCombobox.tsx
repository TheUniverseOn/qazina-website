"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
}

interface SearchableComboboxProps {
  options: ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  recentOptions?: ComboboxOption[];
  recentLabel?: string;
  disabled?: boolean;
}

export function SearchableCombobox({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  recentOptions,
  recentLabel = "Recently Used",
  disabled = false,
}: SearchableComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = options.filter(
    (o) =>
      o.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.description && o.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredRecent = recentOptions?.filter(
    (o) =>
      o.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.description && o.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Build flat list for keyboard navigation
  const allVisible: ComboboxOption[] = [];
  if (filteredRecent && filteredRecent.length > 0) {
    allVisible.push(...filteredRecent);
  }
  allVisible.push(...filteredOptions);

  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setSearchQuery("");
    setHighlightedIndex(-1);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  }, []);

  const select = useCallback(
    (optionValue: string) => {
      onValueChange(optionValue);
      close();
    },
    [onValueChange, close]
  );

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < allVisible.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : allVisible.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < allVisible.length) {
          select(allVisible[highlightedIndex].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-combobox-item]");
      items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => (isOpen ? close() : open())}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-3 py-2 border border-[var(--bg-border)] rounded-[var(--radius-md)] text-sm bg-white transition-colors
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-[var(--text-tertiary)] cursor-pointer"}
          ${isOpen ? "border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20" : ""}
        `}
      >
        <span className={selectedOption ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-[var(--text-tertiary)] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[var(--bg-border)] rounded-[var(--radius-md)] shadow-lg overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--bg-border)]">
            <Search size={16} className="text-[var(--text-tertiary)] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(-1);
              }}
              placeholder={searchPlaceholder}
              className="flex-1 text-sm outline-none bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-0.5 rounded text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Options List */}
          <div ref={listRef} className="max-h-60 overflow-auto">
            {/* Recently Used Section */}
            {filteredRecent && filteredRecent.length > 0 && (
              <>
                <div className="px-3 py-1.5 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                  {recentLabel}
                </div>
                {filteredRecent.map((option, index) => {
                  const isSelected = option.value === value;
                  const isHighlighted = index === highlightedIndex;
                  return (
                    <div
                      key={`recent-${option.value}`}
                      data-combobox-item
                      onClick={() => select(option.value)}
                      className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm transition-colors
                        ${isHighlighted ? "bg-[var(--bg-surface)]" : ""}
                        ${isSelected ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}
                        hover:bg-[var(--bg-surface)]
                      `}
                    >
                      <span className="flex-1">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-[var(--text-tertiary)]">{option.description}</span>
                      )}
                      {isSelected && <Check size={16} className="text-[var(--status-success)] flex-shrink-0" />}
                    </div>
                  );
                })}
                <div className="h-px bg-[var(--bg-border)] mx-3" />
              </>
            )}

            {/* All Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const globalIndex = (filteredRecent?.length || 0) + index;
                const isSelected = option.value === value;
                const isHighlighted = globalIndex === highlightedIndex;
                return (
                  <div
                    key={option.value}
                    data-combobox-item
                    onClick={() => select(option.value)}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm transition-colors
                      ${isHighlighted ? "bg-[var(--bg-surface)]" : ""}
                      ${isSelected ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}
                      hover:bg-[var(--bg-surface)]
                    `}
                  >
                    <span className="flex-1">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-[var(--text-tertiary)]">{option.description}</span>
                    )}
                    {isSelected && <Check size={16} className="text-[var(--status-success)] flex-shrink-0" />}
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-6 text-center text-sm text-[var(--text-tertiary)]">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
