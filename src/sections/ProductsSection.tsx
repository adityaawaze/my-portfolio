import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ProductCard } from '@/components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'RSKPay',
    description:
      'A digital payments and rewards platform enabling mobile recharges, utility bill payments, wallet transactions, gift card purchases, cashback rewards, and promotional campaigns.',
    features: [
      'Mobile recharges & bill payments',
      'Wallet transactions',
      'Gift card purchases',
      'Cashback rewards engine',
      'Promotional campaigns',
    ],
    contributions:
      'Transaction workflows, Admin dashboard, Cashback engine, API integrations, Performance optimization',
    techStack: ['Node.js', 'Express.js', 'MySQL', 'REST APIs', 'VPS'],
    image: `${import.meta.env.BASE_URL}images/rskpay-product.jpg`,
    link: 'https://www.rskpay.in',
  },
  {
    name: 'OnMarQ360',
    description:
      'An enterprise workforce management and governance platform designed to simplify organizational operations.',
    features: [
      'Employee Management',
      'Workforce Operations',
      'Attendance Management',
      'Governance Modules',
      'HRMS Features',
    ],
    contributions:
      'Module development, Frontend implementation, Backend services, Database management, Feature enhancements',
    techStack: ['Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    image: `${import.meta.env.BASE_URL}images/onmarq-product.jpg`,
    link: 'https://www.onmarq360.com',
  },
  {
    name: 'PairPinnacle',
    description:
      'A creator economy platform built to simplify influencer-brand collaborations, addressing challenges during discovery and collaboration workflows.',
    features: [
      'Influencer onboarding',
      'Brand onboarding',
      'Campaign management',
      'Creator discovery',
      'Collaboration workflows',
    ],
    contributions:
      'Product architecture, Marketplace workflows, Dashboard development, Backend APIs, Database design',
    techStack: ['Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    image: `${import.meta.env.BASE_URL}images/pairpinnacle-product.jpg`,
    link: 'https://www.pairpinnacle.com',
  },
];

export function ProductsSection() {
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
      id="products"
      ref={sectionRef}
      className="relative w-full bg-portfolio-black overflow-hidden"
    >
      <div ref={contentRef} className="section-padding">
        <div className="content-max-width">
          <div className="text-center mb-12">
            <ScrollReveal>
              <SectionLabel text="PRODUCTION PRODUCTS" className="justify-center" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="display-l text-portfolio-white mt-4">What I Built</h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
