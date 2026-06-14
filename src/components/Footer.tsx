import { Linkedin, Mail } from 'lucide-react';
import { IconButton } from './IconButton';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Products', href: '#products' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-portfolio-black border-t border-portfolio-gray-border">
      <div 
        className="py-12"
        style={{
          paddingLeft: 'clamp(20px, 5vw, 80px)',
          paddingRight: 'clamp(20px, 5vw, 80px)',
        }}
      >
        <div className="content-max-width grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left - Brand */}
          <div>
            <h3 className="heading-m text-portfolio-white">Aditya Awaze</h3>
            <p className="label-style text-portfolio-green mt-1">Software Engineer</p>
            <p className="body-s text-portfolio-gray-text mt-2">Nagpur, Maharashtra, India</p>
          </div>

          {/* Center - Quick Links */}
          <div>
            <h4 className="label-style text-portfolio-gray-text mb-4">NAVIGATION</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="body-s text-portfolio-gray-text hover:text-portfolio-green transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Links */}
          <div>
            <h4 className="label-style text-portfolio-gray-text mb-4">CONNECT</h4>
            <div className="flex gap-3">
              <IconButton 
                icon={Linkedin} 
                href="https://www.linkedin.com/in/aditya-awaze-tech-operations" 
                label="LinkedIn"
                size="sm"
              />
              <IconButton 
                icon={Mail} 
                href="mailto:adityaawaze12@gmail.com" 
                label="Email"
                size="sm"
              />
            </div>
            <a 
              href="mailto:adityaawaze12@gmail.com"
              className="body-s text-portfolio-green hover:underline mt-4 inline-block transition-colors"
            >
              adityaawaze12@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-portfolio-gray-border">
        <div 
          className="py-5 flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
          }}
        >
          <p className="body-s text-portfolio-gray-text">
            &copy; 2026 Aditya Awaze. All rights reserved.
          </p>
          <p className="body-s text-portfolio-gray-text">
            Built with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
