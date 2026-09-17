import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Coleção de artigos da wiki.
 * Cada arquivo .md em src/content/wiki vira uma página em /wiki/<nome-do-arquivo>/.
 * Arquivos que começam com "_" são ignorados (use para rascunhos locais).
 */
const wiki = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/wiki' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** slug de uma categoria cadastrada em src/data/categories.ts */
    category: z.string(),
    /** ordem dentro da categoria (menor aparece primeiro) */
    order: z.number().default(100),
    keywords: z.array(z.string()).default([]),
    /** caminho de imagem dentro de /public (ex.: /img/itens/kunai.png) */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /**
     * confirmado  -> tudo verificado nos arquivos do jogo
     * parcial     -> página publicada, mas com trechos pendentes de revisão
     * rascunho    -> não é publicada
     */
    status: z.enum(['confirmado', 'parcial', 'rascunho']).default('confirmado'),
    updated: z.coerce.date(),
    /** slugs de artigos relacionados (nome do arquivo sem .md) */
    related: z.array(z.string()).default([]),
    /** aparece em "Conteúdos recomendados" na página inicial */
    popular: z.boolean().default(false),
  }),
});

export const collections = { wiki };
