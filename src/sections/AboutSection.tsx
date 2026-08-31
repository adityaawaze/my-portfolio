import { Check, Briefcase, MapPin, GraduationCap, Shield, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StatCounter } from '@/components/StatCounter';
import { sectionIcons } from '@/lib/icons';

const base = import.meta.env.BASE_URL;

const philosophyItems = [
  'Build solutions that solve real problems',
  'Focus on scalability from day one',
  'Take ownership from idea to production',
  'Prioritize user experience alongside technical excellence',
];

const activeProducts = [
  {
    name: 'RSKPay',
    tag: 'Fintech',
    image: `${base}images/rskpay-product.webp`,
    link: 'https://www.rskpay.in',
  },
  {
    name: 'OnMarQ360',
    tag: 'Enterprise',
    image: `${base}images/onmarq-product.png`,
    link: 'https://www.onmarq360.com',
  },
  {
    name: 'PairPinnacle',
    tag: 'Creator Economy',
    image: `${base}images/pairpinnacle-product.webp`,
    link: 'https://www.pairpinnacle.com',
  },
];

const focusAreas = ['Fintech', 'SaaS', 'Marketplace', 'Enterprise', 'APIs', 'Full-Stack'];

export function AboutSection() {
  return (
    <section id="about" className="relative section-padding">
      <div className="content-max-width">
        <ScrollReveal>
          <SectionHeader
            number="01"
            label="About Me"
            title="Who I Am"
            subtitle="Building production-grade software across fintech, SaaS, and enterprise ecosystems."
            icon={sectionIcons.about}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Snapshot panel — no duplicate profile photo */}
          <ScrollReveal className="lg:col-span-5 flex flex-col gap-4">
            <div className="portfolio-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--portfolio-accent-subtle)' }}
                >
                  <Briefcase className="w-5 h-5 text-portfolio-green" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="label-style text-portfolio-green">Currently</p>
                  <p className="heading-m text-portfolio-white font-display mt-1">Senior Software Engineer</p>
                  <p className="body-s text-portfolio-gray-text mt-1">RSK Online Services Pvt. Ltd.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-5 pt-5 border-t border-portfolio-gray-border body-s text-portfolio-gray-text">
                <MapPin className="w-4 h-4 text-portfolio-green flex-shrink-0" />
                Nagpur, Maharashtra, India
              </div>
            </div>

            <div className="portfolio-card rounded-2xl p-6">
              <p className="label-style text-portfolio-green mb-4">Active Products</p>
              <div className="flex flex-col gap-3">
                {activeProducts.map((product) => (
                  <a
                    key={product.name}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group rounded-xl border border-portfolio-gray-border p-2 hover:border-portfolio-green transition-colors"
                  >
                    <div className="w-16 h-10 flex-shrink-0 rounded overflow-hidden bg-portfolio-surface-muted">
                      <img
                        src={product.image}
                        alt={`${product.name} product`}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="body-s font-medium text-portfolio-white truncate">{product.name}</p>
                      <p className="label-style text-portfolio-gray-text text-[0.65rem]">{product.tag}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-portfolio-gray-text group-hover:text-portfolio-green flex-shrink-0 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="portfolio-card rounded-2xl p-5">
                <GraduationCap className="w-5 h-5 text-portfolio-green mb-2" strokeWidth={1.5} />
                <p className="body-s text-portfolio-white font-medium">B.Tech IT</p>
                <p className="body-s text-portfolio-gray-text mt-1 text-xs leading-snug">Priyadarshini Bhagwati COE</p>
              </div>
              <div className="portfolio-card rounded-2xl p-5">
                <Shield className="w-5 h-5 text-portfolio-green mb-2" strokeWidth={1.5} />
                <p className="body-s text-portfolio-white font-medium">Google Cybersecurity</p>
                <p className="body-s text-portfolio-gray-text mt-1 text-xs leading-snug">Professional Certificate</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="mono-style px-3 py-1.5 rounded-sm border border-portfolio-gray-border text-portfolio-gray-text bg-portfolio-surface-muted"
                >
                  {area}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <ScrollReveal delay={0.1}>
              <div className="portfolio-card rounded-2xl p-8">
                <p className="body-l text-portfolio-gray-text leading-relaxed">
                  I am a Software Engineer with hands-on experience building and scaling production-grade
                  applications across Fintech, SaaS, Marketplace, and Enterprise platforms. Over the past
                  few years, I have worked in startup environments where ownership extends far beyond writing
                  code — frontend development, backend engineering, database design, API integrations,
                  deployment, product operations, workflow automation, and production support. Currently,
                  I work with RSK Online Services Pvt. Ltd., contributing to products used by thousands of
                  users across digital payments, rewards, workforce management, and creator economy ecosystems.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="portfolio-card rounded-2xl p-8">
                <p className="label-style text-portfolio-green mb-4">Philosophy</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {philosophyItems.map((item, i) => (
                    <li key={i} className="body-m text-portfolio-white flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-portfolio-green mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCounter end={18} suffix="+" label="Months Experience" delay={0} />
                <StatCounter end={5} suffix="+" label="Built & Contributed" delay={0.1} />
                <StatCounter end={2} suffix="+" label="Publications" delay={0.2} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
