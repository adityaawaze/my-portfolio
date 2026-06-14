import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  name: string;
  description: string;
  features: string[];
  contributions: string;
  techStack: string[];
  image: string;
  link: string;
  delay?: number;
}

export function ProductCard({
  name,
  description,
  features,
  contributions,
  techStack,
  image,
  link,
  delay = 0,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    // Card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Image parallax
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: '-5%' },
        {
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="bg-portfolio-gray-dark border border-portfolio-gray-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-portfolio-brown-light hover:shadow-card-hover group"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-portfolio-gray-dark via-transparent to-transparent opacity-70" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="heading-m text-portfolio-white">{name}</h3>
        <p className="body-m text-portfolio-gray-text mt-2">{description}</p>

        <ul className="mt-4 space-y-1.5">
          {features.map((feature, i) => (
            <li key={i} className="body-s text-portfolio-gray-text flex items-start gap-2">
              <span className="text-portfolio-green mt-0.5">&#8226;</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <span className="label-style text-portfolio-green">MY CONTRIBUTIONS</span>
          <p className="body-s text-portfolio-white mt-1">{contributions}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className="label-style px-3 py-1 rounded-full bg-portfolio-brown/40 text-portfolio-brown-light"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 text-portfolio-green body-s font-medium hover:underline transition-all"
        >
          Visit {name} &rarr;
        </a>
      </div>
    </div>
  );
}
