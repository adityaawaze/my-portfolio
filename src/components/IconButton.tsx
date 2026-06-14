import { type ElementType } from 'react';

interface IconButtonProps {
  icon: ElementType;
  href: string;
  label: string;
  size?: 'sm' | 'md';
}

export function IconButton({ icon: Icon, href, label, size = 'md' }: IconButtonProps) {
  const sizeClasses = size === 'sm' 
    ? 'w-10 h-10' 
    : 'w-14 h-14';
  const iconSize = size === 'sm' ? 18 : 24;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${sizeClasses} rounded-full border border-portfolio-gray-border bg-transparent flex items-center justify-center transition-all duration-200 hover:border-portfolio-green hover:bg-portfolio-green/10 group`}
    >
      <Icon 
        className="text-portfolio-white group-hover:text-portfolio-green transition-colors" 
        size={iconSize}
        strokeWidth={1.5}
      />
    </a>
  );
}
