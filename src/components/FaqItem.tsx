"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2 md:gap-3 p-4 md:p-5 px-4 md:px-6 w-full max-w-[800px] border border-[var(--border-default)] rounded-[10px] md:rounded-[12px]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left gap-4"
      >
        <span className="text-[14px] md:text-[16px] font-medium text-[var(--text-primary)]">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[var(--text-tertiary)] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)] flex-shrink-0" />
        )}
      </button>

      {/* Answer */}
      {isOpen && (
        <p className="text-[13px] md:text-[14px] text-[var(--text-secondary)] leading-[1.6]">
          {answer}
        </p>
      )}
    </div>
  );
}
