import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Products', href: '#products' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100 && currentY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Track active section
    const sections = navLinks.map(link => link.href.slice(1));
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });
  });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #333333',
          paddingLeft: 'clamp(20px, 5vw, 80px)',
          paddingRight: 'clamp(20px, 5vw, 80px)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col">
          <span className="heading-s text-portfolio-white leading-tight">Aditya Awaze</span>
          <span className="label-style text-portfolio-green">Software Engineer</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`nav-style relative transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-portfolio-green'
                  : 'text-portfolio-white hover:text-portfolio-green'
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-portfolio-green" />
              )}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="mailto:adityaawaze12@gmail.com"
          className="hidden md:block label-style px-6 py-2.5 rounded-button bg-portfolio-green text-portfolio-black hover:bg-[#5ac55c] hover:scale-[1.02] transition-all duration-200"
        >
          Hire Me
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-portfolio-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="heading-m text-portfolio-white hover:text-portfolio-green transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:adityaawaze12@gmail.com"
            className="label-style px-8 py-3 rounded-button bg-portfolio-green text-portfolio-black mt-4"
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}
