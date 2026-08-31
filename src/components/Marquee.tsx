import { type ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: 'slow' | 'normal';
  className?: string;
}

export function Marquee({ children, speed = 'normal', className = '' }: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden py-4 border-y border-portfolio-gray-border ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-portfolio-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-portfolio-black to-transparent z-10 pointer-events-none" />
      <div
        className={`marquee-track flex w-max items-center gap-4 ${speed === 'slow' ? 'marquee-track--slow' : ''}`}
      >
        <div className="flex items-center gap-4 shrink-0">{children}</div>
        <div className="flex items-center gap-4 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
