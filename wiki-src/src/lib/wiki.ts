import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, getCategory } from '../data/categories';

export type WikiEntry = CollectionEntry<'wiki'>;

/** Todos os artigos publicados, ordenados por categoria e ordem. */
export async function getArticles(): Promise<WikiEntry[]> {
  const all = await getCollection('wiki', ({ data }) => data.status !== 'rascunho');

  for (const entry of all) {
    if (!getCategory(entry.data.category)) {
      throw new Error(
        `O artigo "${entry.id}" usa a categoria "${entry.data.category}", que não existe. ` +
          'Cadastre-a em src/data/categories.ts.',
      );
    }
  }

  const catOrder = new Map(CATEGORIES.map((c) => [c.slug, c.order]));
  return all.sort(
    (a, b) =>
      (catOrder.get(a.data.category) ?? 999) - (catOrder.get(b.data.category) ?? 999) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title, 'pt-BR'),
  );
}

export function articleUrl(entry: WikiEntry): string {
  return `/wiki/${entry.id}/`;
}

export function categoryUrl(slug: string): string {
  return `/wiki/categoria/${slug}/`;
}

const dateFmt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' });
export function formatDate(date: Date): string {
  return dateFmt.format(date);
}

/** Resolve a lista "related" e falha o build se algum slug não existir. */
export function resolveRelated(entry: WikiEntry, all: WikiEntry[]): WikiEntry[] {
  return entry.data.related.map((id) => {
    const found = all.find((a) => a.id === id);
    if (!found) {
      throw new Error(`O artigo "${entry.id}" aponta para o relacionado "${id}", que não existe.`);
    }
    return found;
  });
}
