import { Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react';
import { IconButton } from './IconButton';
import { navLinks } from '@/lib/icons';
import { Logo } from '@/components/Logo';

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-portfolio-gray-border mt-8">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--portfolio-gradient)' }} />
      <div className="section-padding !pt-16 !pb-8">
        <div className="content-max-width">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-portfolio-gray-border bg-portfolio-gray-dark shrink-0">
                  <Logo variant="footer" className="text-[1.85rem]" />
                </div>
                <div>
                  <h3 className="heading-m text-portfolio-white font-display">Aditya Awaze</h3>
                  <p className="label-style text-portfolio-green mt-0.5">Software Engineer</p>
                </div>
              </div>
              <p className="body-s text-portfolio-gray-text">Nagpur, Maharashtra, India</p>
              <p className="body-s text-portfolio-gray-text mt-2">Open to collaboration & new opportunities</p>
            </div>

            <div className="md:col-span-3">
              <h4 className="label-style text-portfolio-gray-text mb-4">Navigate</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="body-s text-portfolio-gray-text hover:text-portfolio-green text-left flex items-center gap-1.5 group transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="label-style text-portfolio-gray-text mb-4">Connect</h4>
              <div className="flex gap-3 mb-4">
                <IconButton icon={Github} href="https://github.com/adityaawaze" label="GitHub" size="sm" />
                <IconButton icon={Linkedin} href="https://www.linkedin.com/in/aditya-awaze-tech-operations" label="LinkedIn" size="sm" />
                <IconButton icon={Mail} href="mailto:adityaawaze12@gmail.com" label="Email" size="sm" />
              </div>
              <a href="mailto:adityaawaze12@gmail.com" className="body-s text-portfolio-green hover:underline">
                adityaawaze12@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 border-t border-portfolio-gray-border">
            <p className="body-s text-portfolio-gray-text">© {new Date().getFullYear()} Aditya Awaze. All rights reserved.</p>
            <p className="body-s text-portfolio-gray-text flex items-center gap-1">
              Built with <span className="gradient-text font-semibold">passion</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
