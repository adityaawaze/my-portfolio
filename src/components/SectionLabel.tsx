import { type ElementType } from 'react';

interface SectionLabelProps {
  text: string;
  className?: string;
  icon?: ElementType;
}

export function SectionLabel({ text, className = '', icon: Icon }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Icon ? (
        <Icon className="w-3.5 h-3.5 text-portfolio-green" strokeWidth={2} />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-portfolio-green" />
      )}
      <span className="label-style text-portfolio-green">{text}</span>
    </div>
  );
}
