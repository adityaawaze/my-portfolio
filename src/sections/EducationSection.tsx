import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Bachelor of Technology (Information Technology)',
    institution: 'Priyadarshini Bhagwati College of Engineering, Nagpur',
    period: '2022 \u2013 Present',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Nirala Junior College',
    period: '73%',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Rashtriya Public School, Mandhal',
    period: '86%',
  },
];

const certAreas = [
  'Foundations of Cybersecurity',
  'Linux and SQL',
  'Network Security',
  'Security Risk Management',
  'Security Operations',
  'Python for Cybersecurity Automation',
];

export function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

    // Timeline line draw
    if (lineRef.current) {
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
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-portfolio-gray-mid overflow-hidden"
    >
      <div ref={contentRef} className="section-padding">
        <div className="content-max-width grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certification Card */}
          <ScrollReveal>
            <div className="bg-portfolio-gray-dark border border-portfolio-gray-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-portfolio-green/15 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-portfolio-green" strokeWidth={1.5} />
                </div>
                <SectionLabel text="CERTIFICATION" />
              </div>

              <h3 className="heading-m text-portfolio-white">
                Google Cybersecurity Professional Certificate
              </h3>

              <ul className="mt-6 space-y-3">
                {certAreas.map((area, i) => (
                  <li key={i} className="body-s text-portfolio-gray-text flex items-start gap-2">
                    <span className="text-portfolio-green mt-0.5">&#8226;</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Education Timeline */}
          <div>
            <ScrollReveal>
              <SectionLabel text="EDUCATION" className="mb-6" />
            </ScrollReveal>

            <div className="relative">
              {/* Timeline line */}
              <div
                ref={lineRef}
                className="absolute left-6 top-0 bottom-0 w-0.5 origin-top bg-portfolio-gray-border"
              />

              <div className="space-y-8">
                {educationData.map((edu, index) => (
                  <ScrollReveal key={index} delay={index * 0.15}>
                    <div className="relative pl-16">
                      {/* Connector dot */}
                      <div className="absolute left-[19px] top-2 w-3 h-3 rounded-full bg-portfolio-green" />

                      <h3 className="heading-m text-portfolio-white">{edu.degree}</h3>
                      <p className="body-m text-portfolio-gray-text mt-1">{edu.institution}</p>
                      <p className="body-s text-portfolio-green mt-1">{edu.period}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
