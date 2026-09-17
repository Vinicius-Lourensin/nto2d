import type { APIRoute } from 'astro';
import { SITE } from '../site.config';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL(SITE.siteUrl);
  const body = `User-agent: *\nAllow: /\nDisallow: /wiki/busca/\n\nSitemap: ${new URL('/wiki/sitemap.xml', base).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
