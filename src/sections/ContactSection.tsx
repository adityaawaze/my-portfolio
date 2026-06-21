import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { x: '-10vw' },
      {
        x: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

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

    // Read EmailJS config from Vite env variables. Add these to your .env as VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
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
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-portfolio-black overflow-hidden"
    >
      <div ref={contentRef} className="section-padding">
        <div className="content-max-width max-w-[700px] mx-auto text-center">
          <ScrollReveal>
            <SectionLabel text="GET IN TOUCH" className="justify-center" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="display-l text-portfolio-white mt-4">Let&apos;s Connect</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="body-l text-portfolio-gray-text mt-6 max-w-[560px] mx-auto">
              I&apos;m always open to discussing new opportunities, interesting projects, or just
              having a conversation about technology and product development.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-8" />
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 bg-portfolio-gray-dark border border-portfolio-gray-border rounded-2xl p-6 flex flex-col gap-4 text-left transition-all duration-300 hover:border-portfolio-green max-w-[600px] mx-auto"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-portfolio-green flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="heading-s text-portfolio-white">
                    Send me a message
                  </p>
                  <p className="body-s text-portfolio-gray-text mt-0.5">I will get back to you soon.</p>
                </div>
              </div>

              <input
                type="text"
                name="from_name"
                placeholder="Your name"
                required
                className="input bg-transparent border border-portfolio-gray-border rounded-lg p-3 text-portfolio-white"
              />

              <input
                type="email"
                name="from_email"
                placeholder="Your email"
                required
                className="input bg-transparent border border-portfolio-gray-border rounded-lg p-3 text-portfolio-white"
              />

              <textarea
                name="message"
                placeholder="Your message"
                rows={5}
                required
                className="bg-transparent border border-portfolio-gray-border rounded-lg p-3 text-portfolio-white resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="px-5 py-2 bg-portfolio-green text-portfolio-black rounded-lg disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
