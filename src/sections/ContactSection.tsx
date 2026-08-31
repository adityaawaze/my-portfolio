import { useRef, useState } from 'react';
import { Mail, User, MessageSquare, Send, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { SectionHeader } from '@/components/SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { sectionIcons } from '@/lib/icons';

export function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const name = (data.get('from_name') as string)?.trim();
    const email = (data.get('from_email') as string)?.trim();
    const message = (data.get('message') as string)?.trim();

    if (!name) { toast.error('Please enter your name.'); return; }
    if (!email) { toast.error('Please enter your email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error('Please enter a valid email address.'); return; }
    if (!message) { toast.error('Please enter a message.'); return; }

    setSending(true);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_r4ogcpz';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_pmrf3t6';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'MQKXJ-hH1OYvB73Go';

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      toast.success('Message sent — thank you!');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error', err);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative section-padding">
      <div className="content-max-width">
        <ScrollReveal>
          <SectionHeader
            number="08"
            label="Get In Touch"
            title="Let's Connect"
            subtitle="I'm always open to discussing new opportunities, interesting projects, or conversations about technology."
            icon={sectionIcons.contact}
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between">
              <div>
                <Mail className="w-8 h-8 text-portfolio-green mb-4" />
                <h3 className="heading-m text-portfolio-white font-display mb-2">Drop me a line</h3>
                <p className="body-m text-portfolio-gray-text">I will get back to you as soon as possible.</p>
              </div>
              <a
                href="mailto:adityaawaze12@gmail.com"
                className="body-m text-portfolio-green hover:underline mt-8 flex items-center gap-2 group"
              >
                adityaawaze12@gmail.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 flex flex-col gap-5"
            >
              <div>
                <label htmlFor="from_name" className="body-s text-portfolio-gray-text flex items-center gap-1.5 mb-2">
                  <User className="w-3.5 h-3.5" /> Your name
                </label>
                <input
                  id="from_name"
                  type="text"
                  name="from_name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-portfolio-surface-muted/50 border border-portfolio-gray-border rounded-xl p-3.5 text-portfolio-white placeholder:text-portfolio-gray-text/50 focus:outline-none focus:border-portfolio-green focus:ring-1 focus:ring-portfolio-green transition-colors"
                />
              </div>

              <div>
                <label htmlFor="from_email" className="body-s text-portfolio-gray-text flex items-center gap-1.5 mb-2">
                  <Mail className="w-3.5 h-3.5" /> Your email
                </label>
                <input
                  id="from_email"
                  type="email"
                  name="from_email"
                  placeholder="john@example.com"
                  required
                  className="w-full bg-portfolio-surface-muted/50 border border-portfolio-gray-border rounded-xl p-3.5 text-portfolio-white placeholder:text-portfolio-gray-text/50 focus:outline-none focus:border-portfolio-green focus:ring-1 focus:ring-portfolio-green transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="body-s text-portfolio-gray-text flex items-center gap-1.5 mb-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="w-full bg-portfolio-surface-muted/50 border border-portfolio-gray-border rounded-xl p-3.5 text-portfolio-white placeholder:text-portfolio-gray-text/50 resize-none focus:outline-none focus:border-portfolio-green focus:ring-1 focus:ring-portfolio-green transition-colors"
                />
              </div>

              <button type="submit" disabled={sending} className="btn-primary self-end disabled:opacity-50">
                {sending ? 'Sending...' : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
