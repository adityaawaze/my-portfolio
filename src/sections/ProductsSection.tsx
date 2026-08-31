import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';
import { ProductCard } from '@/components/ProductCard';
import { sectionIcons } from '@/lib/icons';

gsap.registerPlugin(ScrollTrigger);

const base = import.meta.env.BASE_URL;

const products = [
  {
    name: 'RSKPay',
    category: 'Fintech · Payments',
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
    image: `${base}images/rskpay-product.webp`,
    link: 'https://www.rskpay.in',
    imageAspect: 'aspect-[4/3]',
    imageBg: 'bg-white',
    imagePadding: 'p-8 md:p-12',
  },
  {
    name: 'OnMarQ360',
    category: 'Enterprise · HRMS',
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
    image: `${base}images/onmarq-product.png`,
    link: 'https://www.onmarq360.com',
    imageAspect: 'aspect-[2/1]',
    imageBg: 'bg-[#f0f6fc]',
    imagePadding: 'p-2 md:p-3',
  },
  {
    name: 'PairPinnacle',
    category: 'Creator Economy',
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
    image: `${base}images/pairpinnacle-product.webp`,
    link: 'https://www.pairpinnacle.com',
    imageAspect: 'aspect-[2/1]',
    imageBg: 'bg-black',
    imagePadding: 'p-0',
  },
];

export function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dividers = sectionRef.current.querySelectorAll('.product-divider');
    gsap.fromTo(
      dividers,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.9,
        ease: 'power3.inOut',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="products" ref={sectionRef} className="relative section-padding bg-portfolio-gray-mid/40">
      <div className="content-max-width">
        <SectionHeader
          number="03"
          label="Production Products"
          title="What I Built"
          subtitle="Live platforms serving thousands of users across fintech and enterprise."
          icon={sectionIcons.products}
        />

        <div className="flex flex-col gap-20 lg:gap-28">
          {products.map((product, i) => (
            <div key={product.name}>
              {i > 0 && (
                <div className="product-divider h-px w-full bg-portfolio-gray-border mb-20 lg:mb-28" />
              )}
              <ProductCard {...product} index={i} delay={0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
