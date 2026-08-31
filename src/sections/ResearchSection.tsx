import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PublicationCard } from '@/components/PublicationCard';
import { sectionIcons } from '@/lib/icons';

const publications = [
  {
    title: 'Online Test Portal',
    publishedIn: 'International Journal of Research and Analytical Reviews (IJRAR)',
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
    publishedIn: 'International Journal of Engineering Research & Technology (IJRASET)',
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
  return (
    <section id="research" className="relative section-padding">
      <div className="content-max-width">
        <ScrollReveal>
          <SectionHeader
            number="05"
            label="Research"
            title="Publications"
            subtitle="Published research on digital platforms and assessment systems."
            icon={sectionIcons.research}
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {publications.map((pub, i) => (
            <PublicationCard key={pub.title} {...pub} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
