/**
 * Categorias da wiki.
 * Para criar uma nova categoria, adicione um item aqui e use o "slug"
 * no campo "category" dos artigos. Categorias sem artigos não aparecem.
 */
export interface Category {
  slug: string;
  title: string;
  description: string;
  /** caractere decorativo exibido nos cartões e no menu */
  icon: string;
  order: number;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'comecando',
    title: 'Começando',
    description: 'O que é o jogo, primeiros passos, criação do personagem e controles.',
    icon: '始',
    order: 1,
  },
  {
    slug: 'personagem',
    title: 'Personagem e progressão',
    description: 'Personagens jogáveis, atributos, níveis, ranks ninja, transformações e reset.',
    icon: '人',
    order: 2,
  },
  {
    slug: 'combate',
    title: 'Combate e jutsus',
    description: 'Como lutar, usar jutsus, requisitos, chakra, alvos e o sistema PK.',
    icon: '戦',
    order: 3,
  },
  {
    slug: 'mundo',
    title: 'Mundo, missões e inimigos',
    description: 'Vilas, mapas, missões, monstros, chefes e criaturas lendárias.',
    icon: '界',
    order: 4,
  },
  {
    slug: 'itens',
    title: 'Itens e economia',
    description: 'Equipamentos, consumíveis, moedas, lojas, banco, trocas e benefícios.',
    icon: '宝',
    order: 5,
  },
  {
    slug: 'social',
    title: 'Social, PvP e eventos',
    description: 'Grupos, organizações, vilas, torneios, guerras, rankings e eventos.',
    icon: '絆',
    order: 6,
  },
  {
    slug: 'ajuda',
    title: 'Ajuda',
    description: 'Perguntas frequentes e glossário de termos do jogo.',
    icon: '助',
    order: 7,
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
