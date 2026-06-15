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
    period: 'Nov 2022 – Jun 2026 — First Division',
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

    // no vertical timeline — centered layout
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

              <a
                href="https://www.coursera.org/account/accomplishments/specialization/certificate/YRKHVF5ZZXNX"
                target="_blank"
                rel="noreferrer"
                className="body-s text-portfolio-green inline-block mt-3 hover:underline"
              >
                View Coursera Specialization Certificate
              </a>

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
                <SectionLabel text="EDUCATION" className="mb-6 justify-center" />
              </ScrollReveal>

              <div className="flex flex-col items-center justify-center">
                <div className="space-y-6 text-center max-w-[720px] mx-auto">
                  {educationData.map((edu, index) => (
                    <ScrollReveal key={index} delay={index * 0.15}>
                      <div>
                        <h3 className="heading-m text-portfolio-white">{edu.degree}</h3>
                        <p className="body-m text-portfolio-gray-text mt-2">{edu.institution}</p>
                        <p className="body-s text-portfolio-green mt-2">{edu.period}</p>
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
