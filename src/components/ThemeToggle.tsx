import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={`w-10 h-10 rounded-full border border-portfolio-gray-border flex items-center justify-center ${className}`}
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`w-10 h-10 rounded-full border border-portfolio-gray-border bg-transparent flex items-center justify-center transition-all duration-200 hover:border-portfolio-green hover:bg-portfolio-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-green focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-black ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <Sun key="sun" className="w-[18px] h-[18px] text-portfolio-green theme-icon-enter" strokeWidth={1.5} />
      ) : (
        <Moon key="moon" className="w-[18px] h-[18px] text-portfolio-green theme-icon-enter" strokeWidth={1.5} />
      )}
    </button>
  );
}
