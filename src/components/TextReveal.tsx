import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
  delay?: number;
  splitBy?: 'words' | 'chars';
}

export function TextReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  splitBy = 'words',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const units = splitBy === 'chars' ? text.split('') : text.split(' ');

    ref.current.innerHTML = units
      .map((unit, i) => {
        const content = splitBy === 'chars' ? unit : unit + (i < units.length - 1 ? '\u00A0' : '');
        return `<span class="text-reveal-unit inline-block overflow-hidden align-bottom"><span class="text-reveal-inner inline-block">${content}</span></span>`;
      })
      .join('');

    const inners = ref.current.querySelectorAll('.text-reveal-inner');
    if (reduced) {
      gsap.set(inners, { y: 0 });
      return;
    }

    gsap.set(inners, { y: '110%' });
    gsap.to(inners, {
      y: 0,
      duration: 0.9,
      delay,
      stagger: splitBy === 'chars' ? 0.025 : 0.06,
      ease: 'power4.out',
    });
  }, [text, delay, splitBy]);

  return <Tag ref={ref as React.RefObject<never>} className={className} />;
}
