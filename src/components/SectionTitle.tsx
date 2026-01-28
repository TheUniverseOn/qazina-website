interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-[40px] font-semibold text-[var(--text-primary)] text-center">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[18px] text-[var(--text-secondary)] leading-[1.6] text-center max-w-[600px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
