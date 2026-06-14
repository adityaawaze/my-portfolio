import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  items: string[];
  tags?: string[];
  links?: { label: string; url: string }[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current.parentElement,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: true,
        },
      }
    );
  }, { scope: lineRef });

  return (
    <div className="relative">
      {/* Timeline line */}
      <div
        ref={lineRef}
        className="absolute left-0 md:left-6 top-0 bottom-0 w-0.5 origin-top"
        style={{
          background: 'linear-gradient(to bottom, #41a443 0%, #333333 100%)',
        }}
      />

      <div className="space-y-8">
        {items.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.2}>
            <div className="relative pl-8 md:pl-16">
              {/* Connector dot */}
              <div 
                className="absolute left-[-5px] md:left-[19px] top-8 w-3 h-3 rounded-full bg-portfolio-green"
              />
              
              {/* Card */}
              <div className="bg-portfolio-gray-dark border border-portfolio-gray-border rounded-2xl p-7 border-l-[3px] border-l-portfolio-green">
                <h3 className="heading-m text-portfolio-white">{item.title}</h3>
                <p className="body-m text-portfolio-green font-medium mt-1">{item.subtitle}</p>
                <p className="body-s text-portfolio-gray-text mt-1">{item.period}</p>
                
                <ul className="mt-4 space-y-2">
                  {item.items.map((listItem, i) => (
                    <li key={i} className="body-s text-portfolio-gray-text flex items-start gap-2">
                      <span className="text-portfolio-green mt-1">&#8250;</span>
                      {listItem}
                    </li>
                  ))}
                </ul>

                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="label-style px-3 py-1 rounded-full bg-portfolio-green/15 text-portfolio-green"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.links && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-style px-3 py-1 rounded-full bg-portfolio-brown/40 text-portfolio-brown-light hover:text-portfolio-green transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
