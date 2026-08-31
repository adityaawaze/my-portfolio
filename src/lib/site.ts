/** Site metadata — tuned for GitHub Pages at adityaawaze.github.io/my-portfolio/ */

export const SITE_URL = 'https://adityaawaze.github.io/my-portfolio/';
export const SITE_BASE = '/my-portfolio/';

export const siteConfig = {
  name: 'Aditya Awaze',
  title: 'Aditya Awaze | Software Engineer — Fintech, SaaS & Full-Stack Developer',
  description:
    'Software Engineer from Nagpur, India. Builds production fintech & SaaS products at RSK Online Services — RSKPay, OnMarQ360, PairPinnacle. React, Node.js, MySQL.',
  url: SITE_URL,
  basePath: SITE_BASE,
  locale: 'en_IN',
  email: 'adityaawaze12@gmail.com',
  location: {
    city: 'Nagpur',
    region: 'Maharashtra',
    country: 'India',
    label: 'Nagpur, Maharashtra, India',
  },
  jobTitle: 'Senior Software Engineer',
  employer: 'RSK Online Services Pvt. Ltd.',
  image: `${SITE_URL}images/hero-profile.jpg`,
  sameAs: [
    'https://github.com/adityaawaze',
    'https://www.linkedin.com/in/aditya-awaze-tech-operations',
    'mailto:adityaawaze12@gmail.com',
  ],
  keywords: [
    'Aditya Awaze',
    'Software Engineer',
    'Full-Stack Developer',
    'Fintech Developer',
    'SaaS Developer',
    'React Developer',
    'Node.js Developer',
    'Nagpur',
    'India',
    'RSKPay',
    'OnMarQ360',
    'PairPinnacle',
  ],
  products: ['RSKPay', 'OnMarQ360', 'PairPinnacle'],
  skills: [
    'React.js',
    'Node.js',
    'Express.js',
    'MySQL',
    'JavaScript',
    'REST APIs',
    'TypeScript',
    'VPS Deployment',
  ],
  publications: [
    {
      title: 'Online Test Portal',
      publisher: 'International Journal of Research and Analytical Reviews (IJRAR)',
      url: 'http://www.ijrar.org/papers/IJRAR25B1955.pdf',
    },
    {
      title: 'Connect2NGO',
      publisher: 'International Journal of Engineering Research & Technology (IJRASET)',
      url: 'https://www.ijraset.com/research-paper/connect2ngo-an-integrated-digital-platform',
    },
  ],
} as const;

export const faqItems = [
  {
    question: 'Who is Aditya Awaze?',
    answer:
      'Aditya Awaze is a Software Engineer based in Nagpur, Maharashtra, India. He builds and scales production-grade applications across fintech, SaaS, marketplace, and enterprise platforms, currently working as a Senior Software Engineer at RSK Online Services Pvt. Ltd.',
  },
  {
    question: 'What products has Aditya Awaze built?',
    answer:
      'Aditya has contributed to RSKPay (digital payments and rewards), OnMarQ360 (enterprise HRMS and workforce management), and PairPinnacle (creator economy platform). All three are live production products used by real users.',
  },
  {
    question: 'What technologies does Aditya Awaze use?',
    answer:
      'Aditya works with React.js, JavaScript, Node.js, Express.js, MySQL, REST APIs, and VPS deployment. He handles full-stack development from frontend UI to backend architecture, database design, and production deployment.',
  },
  {
    question: 'Where is Aditya Awaze located?',
    answer:
      'Aditya Awaze is based in Nagpur, Maharashtra, India, and is open to remote collaboration and new opportunities.',
  },
  {
    question: 'How can I contact Aditya Awaze?',
    answer:
      'You can reach Aditya via email at adityaawaze12@gmail.com, through LinkedIn at linkedin.com/in/aditya-awaze-tech-operations, or GitHub at github.com/adityaawaze.',
  },
] as const;

export function buildJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: siteConfig.name,
      jobTitle: siteConfig.jobTitle,
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.employer,
      },
      email: siteConfig.email,
      url: siteConfig.url,
      image: siteConfig.image,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.country,
      },
      sameAs: siteConfig.sameAs.filter((link) => !link.startsWith('mailto:')),
      knowsAbout: siteConfig.skills,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${siteConfig.name} — Portfolio`,
      url: siteConfig.url,
      description: siteConfig.description,
      author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
      inLanguage: 'en-IN',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: siteConfig.title,
      url: siteConfig.url,
      description: siteConfig.description,
      mainEntity: { '@type': 'Person', name: siteConfig.name },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];
}

export function buildCrawlerSummaryHtml() {
  const productLinks = [
    ['RSKPay', 'https://www.rskpay.in'],
    ['OnMarQ360', 'https://www.onmarq360.com'],
    ['PairPinnacle', 'https://www.pairpinnacle.com'],
  ]
    .map(([name, url]) => `<li><a href="${url}">${name}</a></li>`)
    .join('');

  const faqHtml = faqItems
    .map(
      (item) =>
        `<dt><strong>${item.question}</strong></dt><dd>${item.answer}</dd>`,
    )
    .join('');

  return `<article id="crawler-content" style="padding:2rem;max-width:52rem;margin:0 auto;font-family:system-ui,sans-serif;line-height:1.6;color:#0f1221">
  <h1>${siteConfig.name} — ${siteConfig.jobTitle}</h1>
  <p>${siteConfig.description}</p>
  <p><strong>Location:</strong> ${siteConfig.location.label} · <strong>Employer:</strong> ${siteConfig.employer}</p>
  <h2>Products</h2>
  <ul>${productLinks}</ul>
  <h2>Skills</h2>
  <p>${siteConfig.skills.join(', ')}.</p>
  <h2>Publications</h2>
  <ul>${siteConfig.publications.map((p) => `<li><a href="${p.url}">${p.title}</a> — ${p.publisher}</li>`).join('')}</ul>
  <h2>FAQ</h2>
  <dl>${faqHtml}</dl>
  <p><a href="${siteConfig.url}">View full portfolio</a> · <a href="mailto:${siteConfig.email}">${siteConfig.email}</a></p>
</article>`;
}
