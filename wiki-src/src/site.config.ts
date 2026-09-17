/**
 * CONFIGURAÇÃO CENTRAL DA WIKI
 */
export const SITE = {
  gameName: 'Naruto 2D',
  wikiName: 'Wiki NTO 2D',
  tagline: 'O guia do jogador para dominar jutsus, evoluir seus personagens e subir de Estudante a Kage.',
  description:
    'Wiki do Naruto 2D: primeiros passos, personagens, jutsus, combate, ranks ninja, missões, itens, organizações e eventos explicados de forma simples.',

  siteUrl: 'https://nto2d.pages.dev',

  officialUrl: 'https://nto2d.pages.dev',
  playUrl: 'https://nto2d.pages.dev',
  downloadUrl: 'https://nto2d.pages.dev',
  discordUrl: 'https://discord.gg/WCmQUBjX9G',
  social: {
    youtube: '',
    instagram: '',
    tiktok: '',
    facebook: '',
  },

  // Com base /wiki, arquivos de public/ ficam em /wiki/...
  logo: '/wiki/logo.svg',
  ogImage: '/wiki/og-image.png',
  themeColor: '#ff6a00',

  lang: 'pt-BR',
  locale: 'pt_BR',
} as const;

export type SocialKey = keyof typeof SITE.social;

export const SOCIAL_LABELS: Record<SocialKey, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
};
