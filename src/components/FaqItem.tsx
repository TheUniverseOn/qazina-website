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
    <div className="flex flex-col gap-3 p-5 px-6 w-[800px] border border-[var(--border-default)] rounded-[12px]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-[16px] font-medium text-[var(--text-primary)]">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[var(--text-tertiary)]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />
        )}
      </button>

      {/* Answer */}
      {isOpen && (
        <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6] w-[752px]">
          {answer}
        </p>
      )}
    </div>
  );
}
