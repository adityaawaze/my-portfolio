import type { IconType } from 'react-icons';
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiWordpress,
  SiCanvas,
  SiLinux,
} from 'react-icons/si';

const techIconMap: Record<string, IconType> = {
  'React.js': SiReact,
  JavaScript: SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  Bootstrap: SiBootstrap,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MySQL: SiMysql,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  Figma: SiFigma,
  WordPress: SiWordpress,
  Elementor: SiWordpress,
  Canva: SiCanvas,
  'VPS Deployment': SiLinux,
  'Linux Server Management': SiLinux,
  'Production Deployment': SiLinux,
  'Hosting Configuration': SiLinux,
};

export function getTechIcon(skillName: string): IconType | null {
  return techIconMap[skillName] ?? null;
}
