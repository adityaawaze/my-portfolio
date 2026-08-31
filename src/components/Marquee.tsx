import { type ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: 'slow' | 'normal';
}

export function Marquee({ children, speed = 'normal' }: MarqueeProps) {
  const duration = speed === 'slow' ? '40s' : '25s';

  return (
    <div className="relative overflow-hidden py-4 border-y border-portfolio-gray-border">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-portfolio-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-portfolio-black to-transparent z-10 pointer-events-none" />
      <div
        className="flex w-max gap-8"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
