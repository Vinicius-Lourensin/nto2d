// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/site.config.ts';

// A URL final pode ser definida em src/site.config.ts (siteUrl)
// ou pela variável de ambiente SITE_URL na Cloudflare Pages.
const site = process.env.SITE_URL || SITE.siteUrl;

export default defineConfig({
  site,
  base: '/wiki',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
