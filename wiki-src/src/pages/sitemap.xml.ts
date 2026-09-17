import type { APIRoute } from 'astro';
import { SITE } from '../site.config';
import { CATEGORIES } from '../data/categories';
import { getArticles, articleUrl, categoryUrl } from '../lib/wiki';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(SITE.siteUrl);
  const articles = await getArticles();
  const latest = articles.reduce((d, a) => (a.data.updated > d ? a.data.updated : d), new Date(0));
  const day = (d: Date) => d.toISOString().slice(0, 10);

  const urls: { loc: string; lastmod?: string; priority: string }[] = [
    { loc: '/wiki/', lastmod: day(latest), priority: '1.0' },
    { loc: '/wiki/paginas/', lastmod: day(latest), priority: '0.8' },
    { loc: '/wiki/busca/', priority: '0.3' },
    ...CATEGORIES.filter((c) => articles.some((a) => a.data.category === c.slug)).map((c) => ({
      loc: categoryUrl(c.slug),
      priority: '0.6',
    })),
    ...articles.map((a) => ({ loc: articleUrl(a), lastmod: day(a.data.updated), priority: '0.7' })),
  ];

  const body = urls
    .map(
      (u) =>
        `  <url><loc>${esc(new URL(u.loc, base).href)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
