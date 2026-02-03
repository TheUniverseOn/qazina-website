"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";
import { Search, ChevronDown, Calendar } from "lucide-react";

interface BaseInputProps {
  label?: string;
  error?: string;
  className?: string;
}

// Text Input
interface TextInputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, leftIcon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-[var(--input-height)] px-3 ${leftIcon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""}
              border border-[var(--bg-border)] rounded-[var(--radius-md)] bg-white
              text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
              focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20
              disabled:bg-[var(--bg-surface)] disabled:text-[var(--text-disabled)]
              ${error ? "border-[var(--status-error)]" : ""}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-[var(--status-error)]">{error}</span>}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";

// Search Input
interface SearchInputProps extends Omit<TextInputProps, "leftIcon"> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = "Search...", ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        leftIcon={<Search size={18} />}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

// Select Input
interface SelectInputProps extends BaseInputProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  options: { value: string; label: string }[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full h-[var(--input-height)] px-3 pr-10
              border border-[var(--bg-border)] rounded-[var(--radius-md)] bg-white
              text-sm text-[var(--text-primary)] appearance-none
              focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20
              disabled:bg-[var(--bg-surface)] disabled:text-[var(--text-disabled)]
              ${error ? "border-[var(--status-error)]" : ""}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
        </div>
        {error && <span className="text-xs text-[var(--status-error)]">{error}</span>}
      </div>
    );
  }
);
SelectInput.displayName = "SelectInput";

// Textarea
interface TextareaProps extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`w-full min-h-[100px] px-3 py-2
            border border-[var(--bg-border)] rounded-[var(--radius-md)] bg-white
            text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
            focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20
            disabled:bg-[var(--bg-surface)] disabled:text-[var(--text-disabled)] resize-y
            ${error ? "border-[var(--status-error)]" : ""}`}
          {...props}
        />
        {error && <span className="text-xs text-[var(--status-error)]">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// Date Picker
interface DatePickerProps extends Omit<TextInputProps, "type" | "rightIcon"> {}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    return (
      <TextInput
        ref={ref}
        type="date"
        rightIcon={<Calendar size={18} />}
        {...props}
      />
    );
  }
);
DatePicker.displayName = "DatePicker";

// Checkbox Input
interface CheckboxInputProps extends BaseInputProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export function CheckboxInput({ label, error, checked, onChange, children, className = "" }: CheckboxInputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 rounded border-[var(--bg-border)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20 cursor-pointer"
        />
        <span className="text-sm text-[var(--text-primary)]">{children || label}</span>
      </label>
      {error && <span className="text-xs text-[var(--status-error)]">{error}</span>}
    </div>
  );
}

// Radio Group
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps extends BaseInputProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  direction?: "vertical" | "horizontal";
}

export function RadioGroup({ label, error, options, value, onChange, direction = "vertical", className = "" }: RadioGroupProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>}
      <div className={`flex ${direction === "vertical" ? "flex-col gap-2.5" : "flex-row gap-4 flex-wrap"}`}>
        {options.map((opt) => (
          <label key={opt.value} className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
              className="mt-0.5 w-4 h-4 border-[var(--bg-border)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20 cursor-pointer"
            />
            <div>
              <span className="text-sm text-[var(--text-primary)]">{opt.label}</span>
              {opt.description && <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{opt.description}</p>}
            </div>
          </label>
        ))}
      </div>
      {error && <span className="text-xs text-[var(--status-error)]">{error}</span>}
    </div>
  );
}

// Checkbox Group
interface CheckboxGroupProps extends BaseInputProps {
  options: RadioOption[];
  values?: string[];
  onChange?: (values: string[]) => void;
}

export function CheckboxGroup({ label, error, options, values = [], onChange, className = "" }: CheckboxGroupProps) {
  const handleToggle = (optValue: string) => {
    if (values.includes(optValue)) {
      onChange?.(values.filter((v) => v !== optValue));
    } else {
      onChange?.([...values, optValue]);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>}
      <div className="flex flex-col gap-2.5">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
              className="mt-0.5 w-4 h-4 rounded border-[var(--bg-border)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20 cursor-pointer"
            />
            <div>
              <span className="text-sm text-[var(--text-primary)]">{opt.label}</span>
              {opt.description && <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{opt.description}</p>}
            </div>
          </label>
        ))}
      </div>
      {error && <span className="text-xs text-[var(--status-error)]">{error}</span>}
    </div>
  );
}

// File Upload
interface FileUploadProps extends BaseInputProps {
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  hint?: string;
}

export function FileUpload({ label, error, accept, multiple, onChange, hint, className = "" }: FileUploadProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>}
      <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-[var(--bg-border)] rounded-[var(--radius-md)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 cursor-pointer transition-colors">
        <div className="text-[var(--text-tertiary)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-[var(--accent-primary)]">Click to upload</span>
          <span className="text-sm text-[var(--text-tertiary)]"> or drag and drop</span>
        </div>
        {hint && <p className="text-xs text-[var(--text-tertiary)]">{hint}</p>}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => onChange?.(e.target.files)}
          className="hidden"
        />
      </label>
      {error && <span className="text-xs text-[var(--status-error)]">{error}</span>}
    </div>
  );
}
