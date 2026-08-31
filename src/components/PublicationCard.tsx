import { Check, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface PublicationCardProps {
  title: string;
  publishedIn: string;
  authors?: string;
  summary: string;
  features: string[];
  link: string;
  delay?: number;
}

export function PublicationCard({
  title,
  publishedIn,
  authors,
  summary,
  features,
  link,
  delay = 0,
}: PublicationCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <div className="portfolio-card rounded-2xl p-8 relative overflow-hidden hover:-translate-y-1 hover:border-portfolio-brown-light group">
        <div className="absolute top-0 left-8 w-[60px] h-0.5 bg-portfolio-green" />

        <span className="label-style px-3 py-1 rounded-full bg-portfolio-green/15 text-portfolio-green inline-block">
          RESEARCH PAPER
        </span>

        <h3 className="heading-m text-portfolio-white mt-4">{title}</h3>
        <p className="body-s text-portfolio-gray-text mt-2">{publishedIn}</p>

        {authors && (
          <p className="body-s text-portfolio-white mt-1">{authors}</p>
        )}

        <hr className="border-portfolio-gray-border my-4" />

        <p className="body-m text-portfolio-gray-text">{summary}</p>

        <ul className="mt-4 space-y-1.5">
          {features.map((feature, i) => (
            <li key={i} className="body-s text-portfolio-gray-text flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-portfolio-green mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              {feature}
            </li>
          ))}
        </ul>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-5 text-portfolio-green body-s font-medium hover:underline transition-all group/link"
        >
          View Paper
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2} />
        </a>
      </div>
    </ScrollReveal>
  );
}
