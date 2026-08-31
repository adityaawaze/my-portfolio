import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useRotatingWords } from '@/hooks/useRotatingWords';

gsap.registerPlugin(ScrollTrigger);

const ROLES = ['Software Engineer', 'Product Builder', 'Full-Stack Developer'];
const STATS = [
  { value: '18+', label: 'Months' },
  { value: '5+', label: 'Products' },
  { value: '2', label: 'Papers' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { word: roleWord, phase: rolePhase } = useRotatingWords(ROLES);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) return;

    // Name lines — editorial wipe up
    const lines = sectionRef.current.querySelectorAll('.hero-line-inner');
    gsap.set(lines, { y: '105%' });
    gsap.to(lines, {
      y: 0,
      duration: 1,
      stagger: 0.12,
      delay: 0.2,
      ease: 'power4.out',
    });

    // Accent underline draws in
    if (underlineRef.current) {
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, delay: 0.9, ease: 'power3.inOut' }
      );
    }

    // Meta, CTAs, stats fade in sequence
    gsap.from('.hero-meta', { opacity: 0, y: 20, duration: 0.7, delay: 1.1, ease: 'power2.out' });
    gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.7, delay: 1.3, ease: 'power2.out' });
    gsap.from('.hero-stat', {
      opacity: 0,
      y: 16,
      duration: 0.6,
      stagger: 0.1,
      delay: 1.5,
      ease: 'power2.out',
    });

    // Photo slides in from right with slight rotation settle
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { x: 80, opacity: 0, rotate: 2 },
        { x: 0, opacity: 1, rotate: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' }
      );
    }

    // Parallax on scroll — photo moves slower than text
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Video subtle zoom on scroll
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
  }, { scope: sectionRef });

  // Subtle mouse parallax on photo
  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(photo, { x: x * 18, y: y * 12, duration: 0.6, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* Cinematic video backdrop */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover hero-video-grade"
        >
          <source src={`${import.meta.env.BASE_URL}videos/hero-video.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-video-scrim" />
        <div className="absolute inset-0 film-grain opacity-20" />
      </div>

      <div className="relative z-10 flex-1 flex items-center section-padding !py-24 lg:!py-28">
        <div className="content-max-width w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            {/* Typography block */}
            <div className="max-w-3xl">
              <h1 className="sr-only">Aditya Awaze — Software Engineer</h1>

              <p className="hero-meta label-style text-hero-fg-subtle mb-5 tracking-[0.2em]">
                Nagpur, India — Available for work
              </p>

              {/* Oversized editorial name */}
              <div className="mb-2" aria-hidden="true">
                {['Aditya', 'Awaze'].map((line) => (
                  <div key={line} className="overflow-hidden">
                    <span className="hero-line-inner block font-display font-bold text-hero-fg leading-[0.92] tracking-[-0.04em] text-[clamp(3.5rem,12vw,8rem)]">
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              {/* Drawing accent line */}
              <div
                ref={underlineRef}
                className="h-[3px] w-[min(280px,60vw)] bg-portfolio-green mb-8"
              />

              {/* Rotating role — vertical slide swap */}
              <div className="hero-meta h-[2.5rem] overflow-hidden mb-3">
                <p
                  className={`heading-l text-hero-fg font-display transition-all duration-400 ${
                    rolePhase === 'out'
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-0 opacity-100'
                  }`}
                  style={{ transitionDuration: '400ms' }}
                >
                  {roleWord}
                </p>
              </div>

              <p className="hero-meta body-l text-hero-fg-muted mb-10 max-w-md">
                Fintech · SaaS · Product Builder
              </p>

              <div className="hero-actions flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => scrollTo('products')}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 hero-cta-primary font-display font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-3 px-7 py-3.5 border border-hero text-hero-fg font-display font-semibold text-sm tracking-wide hover:bg-portfolio-accent-subtle transition-all"
                >
                  Get In Touch
                </button>
              </div>

              {/* Stats strip — editorial, not floating cards */}
              <div className="hero-meta flex items-center gap-0 border-t border-hero pt-6">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`hero-stat flex items-baseline gap-2 pr-8 ${i > 0 ? 'pl-8 border-l border-hero' : ''}`}
                  >
                    <span className="font-display text-2xl font-bold text-hero-fg">{stat.value}</span>
                    <span className="label-style text-hero-fg-subtle">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo — diagonal editorial cut */}
            <div
              ref={photoRef}
              className="hidden lg:block relative w-[280px] xl:w-[320px] flex-shrink-0"
            >
              <div className="hero-photo-cut overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/hero-profile.jpg`}
                  alt="Aditya Awaze"
                  className="w-full aspect-[3/4] object-cover hero-photo-tone"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-hero -z-10 hero-photo-cut" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-4 py-5 border-t border-hero group"
        aria-label="Scroll to about section"
      >
        <span className="label-style text-hero-fg-subtle group-hover:text-hero-fg-muted transition-colors tracking-[0.25em]">
          Scroll
        </span>
        <span className="w-12 h-px bg-hero-fg-subtle group-hover:w-20 group-hover:bg-hero-fg-muted transition-all duration-500" />
      </button>
    </section>
  );
}
