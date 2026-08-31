import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(ref.current, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' });
      return;
    }

    gsap.fromTo(
      ref.current,
      { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.6 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration,
        delay,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
