import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PublicationCard } from '@/components/PublicationCard';

gsap.registerPlugin(ScrollTrigger);

const publications = [
  {
    title: 'Online Test Portal',
    publishedIn: 'International Journal of Research and Analytical Reviews (IJRAR)',
    authors: 'Manoj Chaudhari, Kajal Jain, Aditya Awaze',
    summary:
      'A web-based examination platform designed to simplify digital assessments through automation and role-based access management.',
    features: [
      'Online examinations',
      'Automated result generation',
      'Role-Based Access Control',
      'Student management',
      'Performance evaluation',
    ],
    link: 'http://www.ijrar.org/papers/IJRAR25B1955.pdf',
  },
  {
    title: 'Connect2NGO',
    publishedIn: 'IJRASET',
    summary:
      'A digital platform designed to improve transparency, collaboration, and efficiency within the NGO ecosystem.',
    features: [
      'NGO management',
      'Volunteer management',
      'Donation tracking',
      'Transparency reporting',
      'Community engagement',
    ],
    link: 'https://www.ijraset.com/research-paper/connect2ngo-an-integrated-digital-platform',
  },
];

export function ResearchSection() {
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
      id="research"
      ref={sectionRef}
      className="relative w-full bg-portfolio-black overflow-hidden"
    >
      <div ref={contentRef} className="section-padding">
        <div className="content-max-width">
          <div className="text-center mb-12">
            <ScrollReveal>
              <SectionLabel text="RESEARCH" className="justify-center" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-l text-portfolio-white mt-4">Publications</h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {publications.map((pub, i) => (
              <PublicationCard key={pub.title} {...pub} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
