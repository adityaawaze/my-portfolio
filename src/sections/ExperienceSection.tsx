import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Timeline } from '@/components/Timeline';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    title: 'RSK Online Services Pvt. Ltd.',
    subtitle: 'Senior Software Engineer',
    period: 'May 2026 \u2013 Present',
    items: [
      'Building and maintaining production-grade software systems',
      'Developing scalable backend architectures',
      'Implementing workflow automation systems',
      'Contributing to fintech and SaaS product development',
      'Improving platform performance and reliability',
    ],
    tags: ['Node.js', 'Express.js', 'MySQL', 'REST APIs', 'VPS'],
  },
  {
    title: 'RSK Online Services Pvt. Ltd.',
    subtitle: 'Software Developer Intern',
    period: 'May 2025 \u2013 May 2026',
    items: [
      'Full-stack development across multiple live products',
      'Frontend implementation using modern JavaScript frameworks',
      'Backend API development and database design',
      'VPS deployment and server management',
      'Production issue resolution',
    ],
    links: [
      { label: 'RSKPay', url: 'https://www.rskpay.in' },
      { label: 'PairPinnacle', url: 'https://www.pairpinnacle.com' },
      { label: 'OnMarQ360', url: 'https://www.onmarq360.com' },
    ],
  },
  {
    title: 'PugArch Technology Pvt. Ltd.',
    subtitle: 'Junior Software Developer Intern',
    period: 'June 2024 \u2013 November 2024',
    items: [
      'Website development using WordPress',
      'Frontend development and UI/UX implementation',
      'Responsive website development',
      'Client project deployment',
      'CMS customization',
    ],
  },
  {
    title: 'Commenzy Community',
    subtitle: 'Head of Web Development & Video Editing',
    period: 'April 2024 \u2013 December 2024',
    items: [
      'Managed web development activities',
      'Guided community members on technical projects',
      'Led multimedia production initiatives',
      'Mentored junior contributors',
    ],
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { x: '-15vw' },
      {
        x: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-portfolio-gray-mid overflow-hidden"
    >
      <div ref={contentRef} className="section-padding">
        <div className="content-max-width">
          <div className="text-center mb-12">
            <ScrollReveal>
              <SectionLabel text="EXPERIENCE" className="justify-center" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="display-l text-portfolio-white mt-4">My Journey</h2>
            </ScrollReveal>
          </div>

          <div className="max-w-[900px] mx-auto">
            <Timeline items={experienceData} />
          </div>
        </div>
      </div>
    </section>
  );
}
