import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ElementType } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  icon?: ElementType;
  align?: 'left' | 'center';
}

export function SectionHeader({
  number,
  label,
  title,
  subtitle,
  icon: Icon,
  align = 'left',
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  useGSAP(() => {
    if (!ref.current || !titleRef.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const words = title.split(' ');

    titleRef.current.innerHTML = words
      .map(
        (w) =>
          `<span class="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0"><span class="section-title-word inline-block">${w}</span></span>`
      )
      .join('');

    const titleWords = titleRef.current.querySelectorAll('.section-title-word');

    if (reduced) {
      gsap.set([lineRef.current, titleWords, ref.current.querySelector('.section-subtitle')], {
        opacity: 1,
        scaleX: 1,
        y: 0,
      });
      return;
    }

    gsap.set(titleWords, { y: '100%' });
    if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });

    if (lineRef.current) {
      tl.to(lineRef.current, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' });
    }
    tl.to(
      titleWords,
      { y: 0, duration: 0.75, stagger: 0.07, ease: 'power4.out' },
      lineRef.current ? '-=0.5' : 0
    );
    const sub = ref.current.querySelector('.section-subtitle');
    if (sub) {
      tl.from(sub, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, '-=0.35');
    }
  }, { scope: ref });

  return (
    <div ref={ref} className={`flex flex-col gap-4 mb-14 ${alignClass}`}>
      <div className={`flex items-center gap-3 w-full ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-display text-[4rem] md:text-[5rem] font-bold leading-none text-portfolio-foreground/[0.06] select-none">
          {number}
        </span>
        {Icon && <Icon className="w-4 h-4 text-portfolio-green -ml-2" strokeWidth={2} />}
        <span className="label-style text-portfolio-green">{label}</span>
      </div>

      <div
        ref={lineRef}
        className={`h-[2px] bg-portfolio-green w-full max-w-[120px] ${align === 'center' ? 'mx-auto' : ''}`}
      />

      <h2
        ref={titleRef}
        className={`display-l text-portfolio-white font-display ${align === 'center' ? 'mx-auto' : ''}`}
      />

      {subtitle && (
        <p
          className={`section-subtitle body-l text-portfolio-gray-text max-w-xl ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
