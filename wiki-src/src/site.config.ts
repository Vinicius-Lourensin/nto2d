/**
 * CONFIGURAÇÃO CENTRAL DA WIKI
 */
export const SITE = {
  gameName: 'Naruto 2D',
  wikiName: 'Wiki NTO 2D',
  tagline: 'O guia do jogador para dominar jutsus, evoluir seus personagens e subir de Estudante a Kage.',
  description:
    'Wiki do Naruto 2D: primeiros passos, personagens, jutsus, combate, ranks ninja, missões, itens, organizações e eventos explicados de forma simples.',

  siteUrl: 'https://naruto2d.online',

  officialUrl: 'https://naruto2d.online',
  playUrl: 'https://naruto2d.online',
  downloadUrl: 'https://naruto2d.online',
  discordUrl: 'https://discord.gg/WCmQUBjX9G',
  social: {
    youtube: '',
    instagram: '',
    tiktok: '',
    facebook: '',
  },

  // Logo oficial do jogo (PNG em public/)
  logo: '/wiki/Logo.png',
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
