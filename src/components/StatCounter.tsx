import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export function StatCounter({ end, suffix = '', label, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(() => {
    if (!ref.current) return;

    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: end,
      duration: 1.5,
      delay,
      ease: 'power2.out',
      snap: { value: 1 },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplayValue(Math.round(obj.value));
      },
    });
  }, { scope: ref });

  return (
    <div 
      ref={ref}
      className="bg-portfolio-gray-dark border border-portfolio-gray-border rounded-xl px-6 py-5"
    >
      <div className="heading-l text-portfolio-green font-bold">
        {displayValue}{suffix}
      </div>
      <div className="body-s text-portfolio-gray-text mt-1">{label}</div>
    </div>
  );
}
