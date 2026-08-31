import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CategoryCard } from '@/components/CategoryCard';
import { Marquee } from '@/components/Marquee';
import { sectionIcons } from '@/lib/icons';
import { getTechIcon } from '@/lib/tech-icons';

const skillCategories = [
  { icon: 'code', title: 'Frontend', skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design'] },
  { icon: 'server', title: 'Backend', skills: ['Node.js', 'Express.js', 'REST API Development'] },
  { icon: 'database', title: 'Database', skills: ['MySQL', 'Database Design', 'Query Optimization'] },
  { icon: 'cloud', title: 'Deployment', skills: ['VPS Deployment', 'Linux Server Management', 'Production Deployment', 'Hosting Configuration'] },
  { icon: 'design', title: 'Design', skills: ['Figma', 'WordPress', 'Elementor', 'Canva'] },
  { icon: 'tools', title: 'Tools', skills: ['Git', 'GitHub', 'Postman'] },
];

const allSkills = skillCategories.flatMap((c) => c.skills);

export function SkillsSection() {
  return (
    <section id="skills" className="relative section-padding bg-portfolio-gray-mid/50">
      <div className="content-max-width">
        <ScrollReveal>
          <SectionHeader
            number="04"
            label="Tech Stack"
            title="Technical Expertise"
            subtitle="Tools and technologies I work with daily."
            icon={sectionIcons.skills}
            align="center"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Marquee>
            {allSkills.map((skill) => {
              const TechIcon = getTechIcon(skill);
              return (
                <span
                  key={skill}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card whitespace-nowrap body-s text-portfolio-white"
                >
                  {TechIcon && <TechIcon className="w-4 h-4 text-portfolio-green" />}
                  {skill}
                </span>
              );
            })}
          </Marquee>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {skillCategories.map((category, i) => (
            <CategoryCard key={category.title} {...category} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
