import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StatCounter } from '@/components/StatCounter';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const philosophyItems = [
  'Build solutions that solve real problems',
  'Focus on scalability from day one',
  'Take ownership from idea to production',
  'Prioritize user experience alongside technical excellence',
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Parallax wipe
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
      id="about"
      ref={sectionRef}
      className="relative bg-portfolio-black overflow-hidden"
    >
      <div ref={contentRef} className="section-padding">
        <div className="content-max-width grid grid-cols-1 lg:grid-cols-about gap-12 items-start">
          {/* Profile Photo */}
          <ScrollReveal className="relative">
            <div className="relative">
              {/* Brown decorative shape */}
              <div 
                className="absolute -top-5 -left-5 w-full h-full rounded-2xl bg-portfolio-brown -z-10"
                style={{ transform: 'rotate(-3deg)' }}
              />
              <img
                src={`${import.meta.env.BASE_URL}images/hero-profile.jpg`}
                alt="Aditya Awaze"
                className="w-full aspect-[3/4] object-cover rounded-2xl"
                style={{ mixBlendMode: 'normal' }}
              />
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ backgroundColor: 'rgba(22, 51, 23, 0.15)', mixBlendMode: 'multiply' }}
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="space-y-6">
            <ScrollReveal>
              <SectionLabel text="ABOUT" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="heading-l text-portfolio-white">Hello! I&apos;m</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h3 className="display-l text-portfolio-white">Software Engineer</h3>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="body-l text-portfolio-white max-w-[540px]">
                I am a Software Engineer with hands-on experience building and scaling production-grade 
                applications across Fintech, SaaS, Marketplace, and Enterprise platforms. Over the past 
                few years, I have worked in startup environments where ownership extends far beyond writing 
                code — frontend development, backend engineering, database design, API integrations, 
                deployment, product operations, workflow automation, and production support. Currently, 
                I work with RSK Online Services Pvt. Ltd., contributing to products used by thousands of 
                users across digital payments, rewards, workforce management, and creator economy ecosystems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <ul className="space-y-3">
                {philosophyItems.map((item, i) => (
                  <li key={i} className="body-m text-portfolio-white flex items-start gap-3">
                    <Check className="w-4 h-4 text-portfolio-green mt-1 flex-shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <StatCounter end={18} suffix="+" label="Months Experience" delay={0} />
                <StatCounter end={5} suffix="+" label="Built & Contributed" delay={0.15} />
                <StatCounter end={2} suffix="+" label="Publications" delay={0.3} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
