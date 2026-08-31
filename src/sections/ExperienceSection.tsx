import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { JourneyTimeline } from '@/components/JourneyTimeline';
import { sectionIcons } from '@/lib/icons';

const experienceData = [
  {
    title: 'RSK Online Services Pvt. Ltd.',
    subtitle: 'Senior Software Engineer',
    period: 'May 2026 – Present',
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
    period: 'May 2025 – May 2026',
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
    period: 'June 2024 – November 2024',
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
    period: 'April 2024 – December 2024',
    items: [
      'Managed web development activities',
      'Guided community members on technical projects',
      'Led multimedia production initiatives',
      'Mentored junior contributors',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative section-padding bg-portfolio-gray-mid/40">
      <div className="content-max-width">
        <ScrollReveal>
          <SectionHeader
            number="02"
            label="Experience"
            title="Professional Journey"
            subtitle="From internships to senior engineering — building real products at scale."
            icon={sectionIcons.experience}
          />
        </ScrollReveal>

        <JourneyTimeline items={experienceData} />
      </div>
    </section>
  );
}
