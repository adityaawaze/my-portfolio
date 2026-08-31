import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface JourneyItem {
  title: string;
  subtitle: string;
  period: string;
  items: string[];
  tags?: string[];
  links?: { label: string; url: string }[];
}

interface JourneyTimelineProps {
  items: JourneyItem[];
}

function yearFromPeriod(period: string): string {
  const match = period.match(/\d{4}/);
  return match ? match[0] : '';
}

export function JourneyTimeline({ items }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const entries = containerRef.current.querySelectorAll('.journey-entry');
    gsap.fromTo(
      entries,
      { opacity: 0, x: 32 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      }
    );

    if (spineRef.current) {
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      );
    }

    entries.forEach((entry) => {
      ScrollTrigger.create({
        trigger: entry,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => entry.classList.add('journey-entry--active'),
        onLeave: () => entry.classList.remove('journey-entry--active'),
        onEnterBack: () => entry.classList.add('journey-entry--active'),
        onLeaveBack: () => entry.classList.remove('journey-entry--active'),
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop spine */}
      <div className="hidden lg:block absolute left-[88px] top-4 bottom-4 w-px bg-portfolio-gray-border">
        <div
          ref={spineRef}
          className="absolute inset-0 w-full origin-top bg-portfolio-green"
        />
      </div>

      <div className="flex flex-col gap-0">
        {items.map((item, index) => {
          const year = yearFromPeriod(item.period);
          const isLast = index === items.length - 1;

          return (
            <article
              key={`${item.title}-${item.subtitle}-${index}`}
              className={`journey-entry grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-4 lg:gap-10 py-10 lg:py-12 ${
                !isLast ? 'border-b border-portfolio-gray-border/60' : ''
              }`}
            >
              {/* Year rail */}
              <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:pt-2">
                <span className="journey-year font-display text-3xl lg:text-4xl font-bold text-portfolio-foreground/20 transition-colors duration-300">
                  {year}
                </span>
                <div className="journey-dot w-3 h-3 rounded-full border-2 border-portfolio-green bg-portfolio-surface flex-shrink-0 transition-all duration-300" />
              </div>

              {/* Card */}
              <div className="portfolio-card rounded-2xl p-6 md:p-8 transition-all duration-300 journey-card">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--portfolio-accent-subtle)' }}
                    >
                      <Building2 className="w-5 h-5 text-portfolio-green" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="heading-m text-portfolio-white font-display">{item.title}</h3>
                      <p className="body-m text-portfolio-green font-medium mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="label-style text-portfolio-gray-text px-3 py-1.5 rounded-sm border border-portfolio-gray-border bg-portfolio-surface-muted whitespace-nowrap self-start">
                    {item.period}
                  </span>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                  {item.items.map((point, i) => (
                    <li key={i} className="body-s text-portfolio-gray-text flex items-start gap-2.5">
                      <span className="text-portfolio-green font-display text-sm leading-none mt-0.5">—</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {(item.tags || item.links) && (
                  <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-portfolio-gray-border">
                    {item.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="mono-style px-2.5 py-1 rounded-sm border border-portfolio-gray-border text-portfolio-gray-text"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.links?.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mono-style px-2.5 py-1 rounded-sm border border-portfolio-green/40 text-portfolio-green hover:bg-portfolio-accent-subtle transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
