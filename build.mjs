/**
 * Build unificado: landing (raiz) + wiki em /wiki/
 * Saída: dist-site/  → pasta publicada na Cloudflare Pages
 */
import { cpSync, mkdirSync, rmSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist-site');
const wikiSrc = join(root, 'wiki-src');
const wikiDist = join(wikiSrc, 'dist');

function run(cmd, args, cwd) {
  console.log(`\n> ${cmd} ${args.join(' ')}`);
  const r = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function copyLanding() {
  const skip = new Set([
    'wiki-src',
    'dist-site',
    'dist',
    'node_modules',
    '.git',
    '.wrangler',
    '_tmp_recover',
    '_wiki_extract',
    'package.json',
    'package-lock.json',
    'build.mjs',
  ]);
  for (const name of readdirSync(root)) {
    if (skip.has(name)) continue;
    if (name.startsWith('.')) continue;
    if (name.startsWith('_cf_')) continue;
    if (name.endsWith('.zip')) continue;
    const src = join(root, name);
    const dest = join(out, name);
    const st = statSync(src);
    if (st.isDirectory()) cpSync(src, dest, { recursive: true });
    else cpSync(src, dest);
  }
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

console.log('1/3 Landing → dist-site/');
copyLanding();

console.log('2/3 Build da wiki (Astro + Pagefind)…');
if (!existsSync(join(wikiSrc, 'node_modules'))) {
  run('npm', ['ci'], wikiSrc);
}
run('npm', ['run', 'build'], wikiSrc);

console.log('3/3 Wiki → dist-site/wiki/');
cpSync(wikiDist, join(out, 'wiki'), { recursive: true });

console.log(`\nPronto: ${out}`);
console.log('  /          → landing');
console.log('  /wiki/     → wiki NTO 2D\n');
