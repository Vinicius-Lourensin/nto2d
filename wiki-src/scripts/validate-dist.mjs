// Validação do site gerado em dist/:
//  - links internos e imagens quebrados
//  - <img> sem texto alternativo
//  - páginas de artigo órfãs
//  - possíveis segredos (IPs, senhas, tokens, chaves, e-mails)
//  - arquivos obrigatórios (index, 404, sitemap, robots, busca)
// Sai com código 1 se encontrar erro, para o build falhar na Cloudflare Pages.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
/** Prefixo público (astro.config base). Arquivos físicos ficam em dist/ sem esse prefixo. */
const BASE = '/wiki';
const errors = [];
const warnings = [];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}
const toUrl = (file) => BASE + '/' + relative(DIST, file).split(sep).join('/');
/** Converte URL pública (/wiki/...) para caminho relativo dentro de dist/. */
function stripBase(url) {
  if (url === BASE || url === BASE + '/') return '/';
  if (url.startsWith(BASE + '/')) return url.slice(BASE.length);
  return url;
}

const files = await walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const textFiles = files.filter((f) => /\.(html|xml|txt|json|webmanifest)$/.test(f) && !f.includes(`${sep}pagefind${sep}`));

// ---------- arquivos obrigatórios ----------
for (const req of ['index.html', '404.html', 'sitemap.xml', 'robots.txt']) {
  if (!(await exists(join(DIST, req)))) errors.push(`Arquivo obrigatório ausente: dist/${req}`);
}
if (!(await exists(join(DIST, 'pagefind', 'pagefind-ui.js')))) {
  warnings.push('Índice de busca ausente (dist/pagefind). Rode "npm run build" completo.');
}

// ---------- links e imagens ----------
const inbound = new Map();
const attrRe = /\s(?:href|src)=["']([^"']+)["']/g;
for (const file of html) {
  const src = await readFile(file, 'utf8');
  const here = toUrl(file);

  for (const m of src.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) errors.push(`${here}: <img> sem atributo alt -> ${m[0].slice(0, 80)}`);
  }

  for (const m of src.matchAll(attrRe)) {
    let url = m[1];
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    // Link para a landing (fora da wiki) — não validar contra dist da wiki
    if (url === '/' || (!url.startsWith(BASE + '/') && url !== BASE)) continue;
    url = decodeURIComponent(url.split('#')[0].split('?')[0]);
    if (!url) continue;
    const local = stripBase(url);
    const candidates = local.endsWith('/')
      ? [join(DIST, local, 'index.html')]
      : [join(DIST, local), join(DIST, local, 'index.html'), join(DIST, `${local}.html`)];
    let ok = false;
    for (const c of candidates) if (await exists(c)) ok = true;
    if (!ok) errors.push(`${here}: link/arquivo quebrado -> ${m[1]}`);
    if (url.startsWith(BASE + '/') && url !== here.replace(/index\.html$/, '')) {
      inbound.set(url, (inbound.get(url) ?? 0) + 1);
    }
  }
}

// ---------- órfãs ----------
for (const file of html) {
  const url = toUrl(file).replace(/index\.html$/, '');
  if (/^\/wiki\/[^/]+\/$/.test(url) && !inbound.get(url)) warnings.push(`Página sem links apontando para ela: ${url}`);
}

// ---------- segredos ----------
const secretPatterns = [
  ['endereço IP', /\b(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}\b/],
  ['senha/token', /\b(?:senha|password|passwd|api[_-]?key|secret|client_secret|token)\s*[:=]\s*\S+/i],
  ['chave privada', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['e-mail', /[\w.+-]+@[\w-]+\.(?:com|net|org|br|io|dev)\b/i],
  ['chave PIX/CPF', /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/],
];
for (const file of textFiles) {
  const src = await readFile(file, 'utf8');
  // ignora o gerador do Astro e metadados de versão
  const clean = src.replace(/<meta name="generator"[^>]*>/g, '');
  for (const [label, re] of secretPatterns) {
    const m = clean.match(re);
    if (m) errors.push(`${toUrl(file)}: possível ${label} publicado -> "${m[0].slice(0, 40)}"`);
  }
}

// ---------- relatório ----------
console.log(`\nValidação de dist/: ${html.length} páginas HTML, ${files.length} arquivos.`);
for (const w of warnings) console.log(`  aviso: ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} erro(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('  OK: nenhum link quebrado, imagem sem alt ou segredo encontrado.\n');
