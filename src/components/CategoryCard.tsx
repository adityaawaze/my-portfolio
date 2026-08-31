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
    <div ref={cardRef}>
      <div className="portfolio-card rounded-2xl p-7 hover:-translate-y-1 hover:border-portfolio-brown-light group">
        <IconComponent
          className="w-8 h-8 text-portfolio-green mb-4 transition-transform duration-300 group-hover:scale-105"
          strokeWidth={1.5}
        />
        <h3 className="heading-m text-portfolio-white mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            const TechIcon = getTechIcon(skill);
            return (
              <span
                key={i}
                className="mono-style px-3.5 py-1.5 rounded-md bg-portfolio-green/10 text-portfolio-white transition-all duration-200 hover:bg-portfolio-green/25 hover:-translate-y-0.5 cursor-default flex items-center gap-1.5"
              >
                {TechIcon ? (
                  <TechIcon className="w-3.5 h-3.5 text-portfolio-green flex-shrink-0" />
                ) : null}
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
