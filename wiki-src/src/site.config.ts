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
  playUrl: 'https://www.mediafire.com/file/rrqtgn3c9oww0o7/Naruto+2D.exe/file',
  downloadUrl: 'https://www.mediafire.com/file/rrqtgn3c9oww0o7/Naruto+2D.exe/file',
  discordUrl: 'https://discord.gg/WCmQUBjX9G',
  whatsappUrl: 'https://wa.me/557192339308?text=Ol%C3%A1%2C%20estou%20jogando%20o%20Naruto%202D%20e%20gostaria%20de%20tirar%20algumas%20duvidas',
  whatsappLabel: '+55 71 9233-9308',
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
