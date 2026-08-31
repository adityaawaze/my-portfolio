import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  name: string;
  description: string;
  features: string[];
  contributions: string;
  techStack: string[];
  image: string;
  link: string;
  index: number;
  category?: string;
  delay?: number;
  /** Tailwind aspect ratio class, e.g. aspect-[2/1] */
  imageAspect?: string;
  /** Background behind contained image */
  imageBg?: string;
  /** Extra padding inside image frame (for logos) */
  imagePadding?: string;
}

export function ProductCard({
  name,
  description,
  features,
  contributions,
  techStack,
  image,
  link,
  index,
  category,
  delay = 0,
  imageAspect = 'aspect-[2/1]',
  imageBg = 'bg-portfolio-surface-elevated',
  imagePadding = 'p-0',
}: ProductCardProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');

  useGSAP(() => {
    if (!rowRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay,
    });

    tl.from(rowRef.current.querySelector('.product-image-frame'), {
      opacity: 0,
      x: reversed ? 40 : -40,
      duration: 0.8,
      ease: 'power3.out',
    }).from(
      rowRef.current.querySelector('.product-content'),
      { opacity: 0, x: reversed ? -30 : 30, duration: 0.8, ease: 'power3.out' },
      '-=0.55'
    );
  }, { scope: rowRef });

  return (
    <article
      ref={rowRef}
      className={`product-showcase grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
        reversed ? 'lg:[&_.product-image-wrap]:order-2 lg:[&_.product-content]:order-1' : ''
      }`}
    >
      <div className="product-image-wrap relative group">
        <div className="absolute -top-3 left-0 font-display text-[5rem] font-bold leading-none text-portfolio-foreground/[0.04] select-none pointer-events-none z-10">
          {num}
        </div>

        <div
          className={`product-image-frame relative overflow-hidden rounded-sm border border-portfolio-gray-border ${imageAspect} ${imageBg} flex items-center justify-center`}
        >
          <img
            ref={imgRef}
            src={image}
            alt={`${name} product preview`}
            loading="lazy"
            decoding="async"
            width={832}
            height={406}
            className={`w-full h-full object-contain ${imagePadding} transition-transform duration-500 group-hover:scale-[1.02]`}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling;
              if (fallback instanceof HTMLElement) fallback.style.display = 'flex';
            }}
          />
          <div
            className="hidden absolute inset-0 items-center justify-center body-s text-portfolio-gray-text bg-portfolio-surface-muted"
            aria-hidden
          >
            Preview unavailable
          </div>

          {category && (
            <span className="absolute top-4 left-4 label-style px-3 py-1.5 bg-portfolio-black/70 backdrop-blur-sm text-white border border-white/10 z-10">
              {category}
            </span>
          )}
        </div>

        <div
          className={`absolute -bottom-2 h-[2px] w-2/3 bg-portfolio-green ${reversed ? 'right-0' : 'left-0'}`}
        />
      </div>

      <div className="product-content flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="label-style text-portfolio-green">{num} — Live Product</span>
            <h3 className="heading-l text-portfolio-white font-display mt-2">{name}</h3>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-11 h-11 rounded-full border border-portfolio-gray-border flex items-center justify-center text-portfolio-foreground hover:border-portfolio-green hover:bg-portfolio-accent-subtle transition-all group/link"
            aria-label={`Visit ${name}`}
          >
            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <p className="body-l text-portfolio-gray-text leading-relaxed">{description}</p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {features.map((feature, i) => (
            <li key={i} className="body-s text-portfolio-gray-text flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-portfolio-green mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="border-l-2 border-portfolio-green pl-4 py-1">
          <span className="label-style text-portfolio-green">My Contributions</span>
          <p className="body-s text-portfolio-white mt-1.5 leading-relaxed">{contributions}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className="mono-style px-3 py-1 rounded-sm border border-portfolio-gray-border text-portfolio-gray-text bg-portfolio-surface-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 body-s font-medium text-portfolio-green hover:underline group/visit w-fit mt-1"
        >
          Visit {name}
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </article>
  );
}
