interface LogoPlaceholderProps {
  text?: string;
}

export function LogoPlaceholder({ text = "LOGO" }: LogoPlaceholderProps) {
  return (
    <div className="flex items-center justify-center w-[120px] h-12 bg-[#F5F5F5] rounded-[8px]">
      <span className="text-[12px] font-semibold text-[var(--text-tertiary)]">
        {text}
      </span>
    </div>
  );
}
