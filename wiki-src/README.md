# Elysium Wiki — Naruto Inner Power

Wiki estática do jogo **Naruto Inner Power** (feito na Elysium Engine), gerada com **Astro** e busca local com **Pagefind**. Todo o conteúdo foi conferido nos arquivos do servidor do jogo; trechos não confirmados aparecem em caixas "Pendente de revisão".

- 100% estático: sem servidor, sem banco de dados, sem login.
- Compatível com **Cloudflare Pages**.
- Não depende de nenhum arquivo ou servidor do jogo.

## Requisitos

- Node.js **18.20.8 ou superior** (recomendado: 22 — definido em `.node-version`)
- npm

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:4321  (a busca só funciona após o build)
```

## Gerar o site final

```bash
npm run build      # gera dist/, cria o índice de busca e valida o resultado
npm run preview    # serve dist/ localmente para conferir
```

O `npm run build` executa três etapas:

1. `astro build` — gera as páginas em `dist/`;
2. `pagefind --site dist` — cria o índice de busca em `dist/pagefind/`;
3. `node scripts/validate-dist.mjs` — verifica links e imagens quebrados, imagens sem texto alternativo, páginas órfãs e **possíveis segredos** (IPs, senhas, tokens, e-mails). O build falha se algo for encontrado.

## Configuração central

Edite **`src/site.config.ts`**:

| Campo | Para que serve |
|---|---|
| `gameName` | nome do jogo |
| `wikiName` | nome da wiki |
| `tagline`, `description` | textos da página inicial e SEO |
| `siteUrl` | **URL final da wiki** (usada em canonical, sitemap e Open Graph) |
| `officialUrl`, `playUrl`, `downloadUrl`, `discordUrl` | links oficiais — vazio = escondido |
| `social` | redes sociais — vazio = escondido |
| `logo`, `ogImage`, `themeColor` | identidade visual |

Nenhum link foi inventado: todos estão vazios até você preenchê-los. Sem `playUrl`, o botão "Começar a jogar" leva ao guia de primeiros passos.

A URL também pode ser definida pela variável de ambiente `SITE_URL` (útil na Cloudflare).

## Estrutura

```
elysium-wiki/
├─ AUDITORIA_DO_JOGO.md      relatório da auditoria (não é publicado)
├─ docs/MODELO_DE_ARTIGO.md  modelo para novas páginas
├─ public/                   arquivos copiados como estão (logo, favicon, imagens, _headers)
├─ scripts/
│  ├─ validate-dist.mjs      validação pós-build
│  └─ gerar-imagens.ps1      gera og-image.png e apple-touch-icon.png
└─ src/
   ├─ site.config.ts         configuração central
   ├─ content.config.ts      campos aceitos pelos artigos
   ├─ content/wiki/*.md      ARTIGOS (conteúdo)
   ├─ data/categories.ts     categorias
   ├─ components/            componentes reutilizáveis (menu, índice, cards…)
   ├─ layouts/               layout base
   ├─ pages/                 rotas (início, artigos, categorias, busca, 404, sitemap, robots)
   └─ styles/global.css      identidade visual (tema claro e escuro)
```

## Guia editorial

### Criar uma página
1. Copie `docs/MODELO_DE_ARTIGO.md` para `src/content/wiki/nome-da-pagina.md`.
2. Preencha o cabeçalho (`title`, `description`, `category`, `order`, `keywords`, `updated`, `related`).
3. Troque `status: rascunho` por `confirmado` (ou `parcial`, se houver trechos pendentes).
4. Rode `npm run dev` para ver a página em `/wiki/nome-da-pagina/`.

A página entra automaticamente no menu lateral, na categoria, no índice "Todas as páginas", no sitemap e na busca.

### Editar um artigo
Abra o arquivo em `src/content/wiki/` e edite o Markdown. Atualize o campo `updated`.

### Campos do artigo
| Campo | Obrigatório | Descrição |
|---|---|---|
| `title` | sim | título |
| `description` | sim | resumo para SEO e cartões |
| `category` | sim | slug de `src/data/categories.ts` |
| `updated` | sim | data da última atualização (AAAA-MM-DD) |
| `order` | não | ordem na categoria |
| `keywords` | não | palavras-chave (também usadas na busca) |
| `image`, `imageAlt` | não | imagem de destaque e texto alternativo |
| `status` | não | `confirmado`, `parcial` ou `rascunho` |
| `related` | não | slugs de artigos relacionados (o build falha se algum não existir) |
| `popular` | não | mostra na página inicial em "Principais sistemas" |

### Caixas de informação
```html
<div class="callout callout--dica">
<p class="callout__title">Dica</p>

Texto em **Markdown** (deixe linhas em branco em volta).

</div>
```
Tipos: `info`, `dica`, `aviso`, `pendente`, `exemplo`, `confirmado`.

### Adicionar imagens
1. Coloque o arquivo em `public/img/...` (ex.: `public/img/chefes/kaguya.png`). Prefira PNG com transparência para sprites.
2. No artigo: `![Descrição da imagem](/img/chefes/kaguya.png)` ou use o campo `image` do cabeçalho.
3. Sempre escreva um texto alternativo.

> O servidor do jogo não contém sprites nem logotipos (a arte fica no cliente). Por isso a wiki usa uma identidade visual própria. Quando houver arte oficial liberada, adicione-a em `public/img/`.

### Incluir uma nova categoria
Adicione um item em `src/data/categories.ts` (`slug`, `title`, `description`, `icon`, `order`) e use o `slug` no campo `category` dos artigos. Categorias sem artigos não aparecem.

### Regerar as imagens de compartilhamento (Windows)
```powershell
powershell -ExecutionPolicy Bypass -File scripts\gerar-imagens.ps1 -Titulo "Naruto Inner Power" -Subtitulo "Wiki do jogador"
```

## Publicar na Cloudflare Pages

1. Envie esta pasta para um repositório Git (GitHub/GitLab).
2. Na Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** e escolha o repositório.
3. Configure:
   - **Framework preset:** Astro (ou None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** a pasta do projeto (se o repositório tiver outras pastas)
   - **Variável de ambiente (opcional):** `SITE_URL = https://seu-dominio`
4. Salve e publique. A cada `git push` a Cloudflare gera uma nova versão.

Alternativa sem Git: rode `npm run build` e envie a pasta `dist/` pelo **Direct Upload** da Cloudflare Pages (ou `npx wrangler pages deploy dist`).

O arquivo `public/_headers` já configura cabeçalhos de segurança e cache, e `404.html` é usado automaticamente como página de erro.
