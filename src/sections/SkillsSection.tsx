import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CategoryCard } from '@/components/CategoryCard';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: 'code',
    title: 'Frontend',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design'],
  },
  {
    icon: 'server',
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST API Development'],
  },
  {
    icon: 'database',
    title: 'Database',
    skills: ['MySQL', 'Database Design', 'Query Optimization'],
  },
  {
    icon: 'cloud',
    title: 'Deployment',
    skills: ['VPS Deployment', 'Linux Server Management', 'Production Deployment', 'Hosting Configuration'],
  },
  {
    icon: 'design',
    title: 'Design',
    skills: ['Figma', 'WordPress', 'Elementor', 'Canva'],
  },
  {
    icon: 'tools',
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Postman'],
  },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current) return;

    // Heading character assembly
    const chars = headingRef.current.querySelectorAll('.skills-char');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 0.5,
      },
    });

    tl.fromTo(
      chars,
      {
        opacity: 0,
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-30, 30),
        scale: 0.5,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: 0.03,
        ease: 'none',
        duration: 0.5,
      },
      0
    );

    // Fade out heading to reveal content
    tl.to(
      headingRef.current,
      { opacity: 0.2, scale: 0.95, duration: 0.3 },
      0.6
    );
  }, { scope: sectionRef });

  // Parallax wipe for content below
  useGSAP(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { x: '-10vw' },
      {
        x: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  const headingText = 'TECH STACK';

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-portfolio-gray-mid overflow-hidden"
    >
      {/* Scroll-driven heading */}
      <div
        ref={headingRef}
        className="min-h-[100dvh] flex items-center justify-center"
      >
        <div className="flex flex-wrap justify-center">
          {headingText.split('').map((char, i) => (
            <span
              key={i}
              className="skills-char display-xl text-portfolio-white inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      {/* Skills grid content */}
      <div ref={contentRef} className="section-padding -mt-20">
        <div className="content-max-width">
          <div className="text-center mb-10">
            <ScrollReveal>
              <SectionLabel text="TECHNICAL EXPERTISE" className="justify-center" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="body-l text-portfolio-gray-text mt-4">
                Tools and technologies I work with
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, i) => (
              <CategoryCard key={category.title} {...category} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
