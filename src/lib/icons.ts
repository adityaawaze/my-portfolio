import {
  User,
  Briefcase,
  Layers,
  Cpu,
  BookOpen,
  GraduationCap,
  Mail,
  CircleHelp,
  type LucideIcon,
} from 'lucide-react';

export const sectionIcons: Record<string, LucideIcon> = {
  about: User,
  experience: Briefcase,
  products: Layers,
  skills: Cpu,
  research: BookOpen,
  education: GraduationCap,
  faq: CircleHelp,
  contact: Mail,
};

export const navLinks = [
  { label: 'About', href: '#about', icon: User },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Products', href: '#products', icon: Layers },
  { label: 'Skills', href: '#skills', icon: Cpu },
  { label: 'Research', href: '#research', icon: BookOpen },
  { label: 'FAQ', href: '#faq', icon: CircleHelp },
  { label: 'Contact', href: '#contact', icon: Mail },
] as const;
