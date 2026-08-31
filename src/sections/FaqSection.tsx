import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { sectionIcons } from '@/lib/icons';
import { faqItems } from '@/lib/site';

export function FaqSection() {
  return (
    <section id="faq" className="relative section-padding">
      <div className="content-max-width">
        <ScrollReveal>
          <SectionHeader
            number="07"
            label="FAQ"
            title="Common Questions"
            subtitle="Quick answers about my work, skills, and how to reach me."
            icon={sectionIcons.faq}
            align="center"
          />
        </ScrollReveal>

        <dl className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqItems.map((item, i) => (
            <ScrollReveal key={item.question} delay={i * 0.06}>
              <div className="portfolio-card rounded-2xl p-6 md:p-7">
                <dt className="heading-s text-portfolio-white font-display mb-3">{item.question}</dt>
                <dd className="body-m text-portfolio-gray-text leading-relaxed">{item.answer}</dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
