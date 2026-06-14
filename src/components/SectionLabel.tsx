interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-portfolio-green" />
      <span className="label-style text-portfolio-green">{text}</span>
    </div>
  );
}
