import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Server,
  Database,
  Cloud,
  Palette,
  Wrench,
  Circle,
} from 'lucide-react';
import { getTechIcon } from '@/lib/tech-icons';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  server: Server,
  database: Database,
  cloud: Cloud,
  design: Palette,
  tools: Wrench,
};

interface CategoryCardProps {
  icon: string;
  title: string;
  skills: string[];
  delay?: number;
}

export function CategoryCard({ icon, title, skills, delay = 0 }: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Code2;
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="h-full">
      <div className="portfolio-card rounded-2xl p-6 md:p-7 h-full flex flex-col hover:-translate-y-1 hover:border-portfolio-brown-light group transition-transform duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--portfolio-accent-subtle)' }}
          >
            <IconComponent
              className="w-5 h-5 text-portfolio-green transition-transform duration-300 group-hover:scale-105"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="heading-m text-portfolio-white font-display">{title}</h3>
        </div>

        <ul className="flex flex-col gap-2.5 flex-1">
          {skills.map((skill) => {
            const TechIcon = getTechIcon(skill);
            return (
              <li
                key={skill}
                className="flex items-center gap-2.5 body-s text-portfolio-gray-text rounded-lg border border-portfolio-gray-border/60 bg-portfolio-surface-muted/40 px-3 py-2"
              >
                {TechIcon ? (
                  <TechIcon className="w-4 h-4 text-portfolio-green flex-shrink-0" />
                ) : (
                  <Circle className="w-2 h-2 text-portfolio-green flex-shrink-0 fill-portfolio-green" />
                )}
                <span className="text-portfolio-white">{skill}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
