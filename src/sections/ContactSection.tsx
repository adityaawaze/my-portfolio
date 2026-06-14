import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { IconButton } from '@/components/IconButton';
import { Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { x: '-10vw' },
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
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-portfolio-black overflow-hidden"
    >
      <div ref={contentRef} className="section-padding">
        <div className="content-max-width max-w-[700px] mx-auto text-center">
          <ScrollReveal>
            <SectionLabel text="GET IN TOUCH" className="justify-center" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="display-l text-portfolio-white mt-4">Let&apos;s Connect</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="body-l text-portfolio-gray-text mt-6 max-w-[560px] mx-auto">
              I&apos;m always open to discussing new opportunities, interesting projects, or just 
              having a conversation about technology and product development.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex justify-center gap-4 mt-8">
              <IconButton
                icon={Linkedin}
                href="https://www.linkedin.com/in/aditya-awaze-tech-operations"
                label="LinkedIn"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <a
              href="mailto:adityaawaze12@gmail.com"
              className="mt-8 bg-portfolio-gray-dark border border-portfolio-gray-border rounded-2xl p-6 flex items-center gap-4 text-left transition-all duration-300 hover:border-portfolio-green hover:bg-portfolio-green/5 max-w-[500px] mx-auto group"
            >
              <Mail className="w-6 h-6 text-portfolio-green flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="heading-s text-portfolio-white group-hover:text-portfolio-green transition-colors">
                  adityaawaze12@gmail.com
                </p>
                <p className="body-s text-portfolio-gray-text mt-0.5">Send me an email</p>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
