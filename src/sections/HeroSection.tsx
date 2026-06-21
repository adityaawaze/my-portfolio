import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleText, setRoleText] = useState('');

  const fullName = 'ADITYA AWAZE';
  const role = 'SOFTWARE ENGINEER';
  const tagline = 'Fintech \u00b7 SaaS \u00b7 Product Builder';

  useGSAP(() => {
    if (!sectionRef.current || !nameRef.current) return;

    const chars = nameRef.current.querySelectorAll('.hero-char');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.5,
      },
    });

    // Phase 1: Characters assemble (0-30%)
    tl.fromTo(
      chars,
      {
        opacity: 0,
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-200, 200),
        rotation: () => gsap.utils.random(-45, 45),
        scale: 0.5,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: 0.02,
        ease: 'none',
        duration: 0.3,
      },
      0
    );

    // Phase 2: Role typing (25-50%)
    tl.fromTo(
      roleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25 },
      0.25
    );

    // Phase 3: Tagline fade (45-60%)
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.15 },
      0.45
    );

    // Phase 4: Scroll indicator fade out (60-80%)
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0.6 },
      { opacity: 0, duration: 0.2 },
      0.6
    );

    // Phase 5: Hero dim (80-100%)
    tl.to(
      sectionRef.current.querySelector('.hero-content'),
      { opacity: 0.3, duration: 0.2 },
      0.8
    );

    // Video parallax
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { y: '0%' },
        {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: true,
          },
        }
      );
    }
  }, { scope: sectionRef });

  // Typing effect for role
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= role.length) {
        setRoleText(role.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Split name into characters
  const nameLines = fullName.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={`${import.meta.env.BASE_URL}videos/hero-video.mp4`} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65 z-[1]" />

      {/* Content */}
      <div className="hero-content relative z-[2] flex flex-col items-center justify-center min-h-[100dvh] px-4">
        {/* Name Assembly */}
        <div ref={nameRef} className="text-center">
          {nameLines.map((line, lineIdx) => (
            <div key={lineIdx} className="flex justify-center flex-wrap">
              {line.split('').map((char, charIdx) => (
                <span
                  key={`${lineIdx}-${charIdx}`}
                  className="hero-char display-xl text-portfolio-white inline-block"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Role Subtitle */}
        <div
          ref={roleRef}
          className="mt-6 label-style text-portfolio-green tracking-[0.15em]"
          style={{ opacity: 0 }}
        >
          {roleText || <span className="opacity-0">{role}</span>}
          <span className="animate-pulse">|</span>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="mt-4 body-m text-portfolio-gray-text text-center max-w-[400px]"
          style={{ opacity: 0 }}
        >
          {tagline}
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <div className="w-px h-10 bg-portfolio-white/40 animate-scroll-indicator" />
          <span className="label-style text-portfolio-gray-text">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
