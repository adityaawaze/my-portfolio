import { cn } from '@/lib/utils';

type LogoProps = {
  variant?: 'nav' | 'footer';
  scrolled?: boolean;
  className?: string;
};

export function Logo({ variant = 'nav', scrolled = false, className }: LogoProps) {
  const text = 'A';

  if (variant === 'footer') {
    return (
      <span className={cn('font-logo text-[2.5rem] leading-none gradient-text', className)}>
        {text}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'font-logo text-[2rem] sm:text-[2.25rem] leading-none transition-all duration-300',
        scrolled ? 'gradient-text' : 'hero-logo-mark',
        className,
      )}
    >
      {text}
    </span>
  );
}
