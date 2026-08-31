import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { Shield, ExternalLink } from 'lucide-react';
import { sectionIcons } from '@/lib/icons';

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
  return (
    <section id="education" className="relative section-padding bg-portfolio-gray-mid/50">
      <div className="content-max-width">
        <ScrollReveal>
          <SectionHeader
            number="06"
            label="Education & Certs"
            title="Learning Path"
            icon={sectionIcons.education}
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'var(--portfolio-accent-subtle)' }}
                >
                  <Shield className="w-6 h-6 text-portfolio-green" strokeWidth={1.5} />
                </div>
                <span className="label-style text-portfolio-green">Certification</span>
              </div>

              <h3 className="heading-m text-portfolio-white font-display">
                Google Cybersecurity Professional Certificate
              </h3>

              <a
                href="https://www.coursera.org/account/accomplishments/specialization/certificate/YRKHVF5ZZXNX"
                target="_blank"
                rel="noreferrer"
                className="body-s text-portfolio-green inline-flex items-center gap-1.5 mt-3 hover:underline group"
              >
                View Coursera Specialization Certificate
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {certAreas.map((area, i) => (
                  <li key={i} className="body-s text-portfolio-gray-text flex items-start gap-2">
                    <span className="text-portfolio-green">•</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
              <span className="label-style text-portfolio-green mb-6">Education</span>
              {educationData.map((edu, index) => (
                <div key={index}>
                  <h3 className="heading-m text-portfolio-white font-display">{edu.degree}</h3>
                  <p className="body-m text-portfolio-gray-text mt-3">{edu.institution}</p>
                  <p className="body-s text-portfolio-green mt-3 px-3 py-1.5 rounded-full inline-block"
                    style={{ background: 'var(--portfolio-accent-subtle)' }}
                  >
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
