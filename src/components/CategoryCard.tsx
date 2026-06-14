import { ScrollReveal } from './ScrollReveal';
import { 
  Code2, 
  Server, 
  Database, 
  Cloud, 
  Palette, 
  Wrench 
} from 'lucide-react';

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

  return (
    <ScrollReveal delay={delay}>
      <div className="bg-portfolio-gray-dark border border-portfolio-gray-border rounded-2xl p-7 transition-all duration-300 hover:border-portfolio-brown-light">
        <IconComponent className="w-8 h-8 text-portfolio-green mb-4" strokeWidth={1.5} />
        <h3 className="heading-m text-portfolio-white mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="mono-style px-3.5 py-1.5 rounded-md bg-portfolio-green/10 text-portfolio-white transition-all duration-200 hover:bg-portfolio-green/25 hover:-translate-y-0.5 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
