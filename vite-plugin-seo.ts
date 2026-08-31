import type { Plugin } from 'vite';
import { buildCrawlerSummaryHtml, buildJsonLd, siteConfig } from './src/lib/site';

function escapeAttr(value: string) {
  return value.replace(/"/g, '&quot;');
}

export function seoInject(): Plugin {
  return {
    name: 'seo-inject',
    transformIndexHtml(html) {
      const tags = [
        `<meta name="description" content="${escapeAttr(siteConfig.description)}" />`,
        `<meta name="author" content="${escapeAttr(siteConfig.name)}" />`,
        `<meta name="keywords" content="${siteConfig.keywords.join(', ')}" />`,
        `<meta name="robots" content="index, follow, max-image-preview:large" />`,
        `<link rel="canonical" href="${siteConfig.url}" />`,

        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${escapeAttr(siteConfig.name)}" />`,
        `<meta property="og:title" content="${escapeAttr(siteConfig.title)}" />`,
        `<meta property="og:description" content="${escapeAttr(siteConfig.description)}" />`,
        `<meta property="og:url" content="${siteConfig.url}" />`,
        `<meta property="og:image" content="${siteConfig.image}" />`,
        `<meta property="og:locale" content="en_IN" />`,

        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeAttr(siteConfig.title)}" />`,
        `<meta name="twitter:description" content="${escapeAttr(siteConfig.description)}" />`,
        `<meta name="twitter:image" content="${siteConfig.image}" />`,

        `<script type="application/ld+json">${JSON.stringify(buildJsonLd())}</script>`,
      ].join('\n    ');

      const noscript = `<noscript>${buildCrawlerSummaryHtml()}</noscript>`;

      return html
        .replace('<title>Aditya Awaze - Portfolio</title>', `<title>${siteConfig.title}</title>`)
        .replace('<!-- SEO_INJECT -->', tags)
        .replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript}`);
    },
  };
}
