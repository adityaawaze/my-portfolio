import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/icons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';

gsap.registerPlugin(ScrollTrigger);

export function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useGSAP(() => {
    navLinks.forEach((link) => {
      const id = link.href.slice(1);
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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`w-full max-w-5xl flex items-center justify-between gap-4 px-4 md:px-6 h-14 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'glass-card shadow-glow'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-green rounded-lg px-1 py-0.5"
          >
            <Logo variant="nav" scrolled={scrolled} />
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`nav-style relative px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? scrolled
                        ? 'text-portfolio-green bg-portfolio-accent-subtle nav-link-active'
                        : 'text-hero-fg nav-link-active'
                      : scrolled
                        ? 'text-portfolio-gray-text hover:text-portfolio-white hover:bg-portfolio-accent-subtle'
                        : 'text-hero-fg-subtle hover:text-hero-fg'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => scrollTo('#contact')} className="btn-primary text-xs px-5 py-2">
              Hire Me
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-hero-fg rounded-lg hover:bg-portfolio-accent-subtle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 glass-card !rounded-none flex flex-col items-center justify-center gap-4 lg:hidden"
          role="dialog" aria-modal="true"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="heading-m text-portfolio-white hover:text-portfolio-green flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-portfolio-accent-subtle transition-colors"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                {link.label}
              </button>
            );
          })}
          <button onClick={() => scrollTo('#contact')} className="btn-primary mt-4">
            Hire Me
          </button>
        </div>
      )}
    </>
  );
}
