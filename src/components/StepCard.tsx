interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 w-full sm:w-[140px] md:w-[180px] lg:w-[260px]">
      {/* Number Container */}
      <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[var(--lime)] rounded-full">
        <span className="text-[16px] md:text-[20px] font-bold text-[var(--text-primary)]">{number}</span>
      </div>

      {/* Title */}
      <span className="text-[14px] md:text-[18px] font-semibold text-[var(--text-primary)] text-center">
        {title}
      </span>

      {/* Description */}
      <p className="text-[12px] md:text-[14px] text-[var(--text-secondary)] leading-[1.5] text-center">
        {description}
      </p>
    </div>
  );
}
