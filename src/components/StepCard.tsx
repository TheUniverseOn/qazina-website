interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-[260px]">
      {/* Number Container */}
      <div className="flex items-center justify-center w-12 h-12 bg-[var(--lime)] rounded-full">
        <span className="text-[20px] font-bold text-[var(--text-primary)]">{number}</span>
      </div>

      {/* Title */}
      <span className="text-[18px] font-semibold text-[var(--text-primary)] text-center">
        {title}
      </span>

      {/* Description */}
      <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5] text-center w-[220px]">
        {description}
      </p>
    </div>
  );
}
