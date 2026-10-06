/**
 * Verificação do site gerado (rode depois do build).
 *
 *   npm run check                 → valida HTML, links internos e âncoras em dist/
 *   npm run check -- --external   → também testa os links externos (WhatsApp, Instagram, agenda...)
 *   npm run check -- --dir dist-exemplo
 */
import { HtmlValidate } from 'html-validate';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const dir = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : 'dist';
const checkExternal = args.includes('--external');

if (!existsSync(dir)) {
  console.error(`Pasta "${dir}" não encontrada. Rode "npm run build" antes.`);
  process.exit(1);
}

const pages = readdirSync(dir).filter((f) => f.endsWith('.html'));
let problems = 0;
const fail = (msg) => {
  problems++;
  console.log(`  ✗ ${msg}`);
};

/* 1. HTML válido -------------------------------------------------------- */
console.log('\n1. Validação de HTML');
const validator = new HtmlValidate({
  extends: ['html-validate:recommended'],
  rules: {
    // O Astro gera atributos e estilos inline legítimos (CSS crítico, object-position).
    'no-inline-style': 'off',
    // role="list" é intencional: o Safari remove a semântica de lista quando list-style é none.
    'no-redundant-role': 'off',
    // Scripts e estilos são gerados pelo próprio build (mesma origem).
    'require-sri': 'off',
    // Títulos com nome + cidade são intencionais para SEO local.
    'long-title': 'off',
  },
});
for (const page of pages) {
  const report = await validator.validateFile(join(dir, page));
  const messages = report.results.flatMap((r) => r.messages);
  if (!messages.length) console.log(`  ✓ ${page}`);
  for (const m of messages) fail(`${page}:${m.line}:${m.column} [${m.ruleId}] ${m.message}`);
}

/* 2. Links internos e âncoras ------------------------------------------ */
console.log('\n2. Links internos e âncoras');
const html = Object.fromEntries(pages.map((p) => [p, readFileSync(join(dir, p), 'utf8')]));
const ids = Object.fromEntries(pages.map((p) => [p, new Set([...html[p].matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const external = new Map();

// Descobre o "base" a partir do og:url da página de links (a versão de demonstração não tem canonical).
const pageUrl = html['index.html']?.match(/<meta property="og:url" content="([^"]+)"/)?.[1] ?? 'https://x/';
const base = new URL(pageUrl).pathname.replace(/\/$/, '');

for (const page of pages) {
  const refs = [...html[page].matchAll(/\s(href|src|srcset)="([^"]+)"/g)].flatMap(([, attr, value]) => {
    const v = value.replaceAll('&amp;', '&');
    // Só o srcset tem várias URLs separadas por vírgula ("a.webp 480w, b.webp 768w").
    return attr === 'srcset' ? v.split(',').map((s) => s.trim().split(/\s+/)[0]) : [v];
  });
  for (const ref of new Set(refs)) {
    if (/^(https?:)?\/\//.test(ref)) {
      if (!external.has(ref)) external.set(ref, page);
      continue;
    }
    if (/^(mailto|tel|data):/.test(ref)) continue;
    const [pathPart, hash] = ref.split('#');
    let target = page;
    if (pathPart) {
      if (!pathPart.startsWith(base + '/') && pathPart !== base) {
        fail(`${page}: link fora do base "${base}": ${ref}`);
        continue;
      }
      target = pathPart.slice(base.length).replace(/^\//, '') || 'index.html';
      if (!existsSync(join(dir, target))) {
        fail(`${page}: arquivo inexistente: ${ref}`);
        continue;
      }
    }
    if (hash && target.endsWith('.html') && !ids[target]?.has(hash)) fail(`${page}: âncora inexistente: ${ref}`);
  }
}
if (!problems) console.log('  ✓ todos os links internos e âncoras existem');

/* 3. Links externos (opcional) ----------------------------------------- */
if (checkExternal) {
  console.log('\n3. Links externos');
  // Cabeçalhos de navegador real: alguns serviços respondem diferente a robôs
  // (ex.: search.google.com/local/reviews dá 404 para robôs e 200 para navegadores).
  const browserHeaders = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8',
  };
  for (const [url, page] of external) {
    const full = url.startsWith('//') ? `https:${url}` : url;
    try {
      const res = await fetch(full, { redirect: 'follow', headers: browserHeaders });
      const ok = res.status < 400 || [403, 429].includes(res.status); // Instagram/Google às vezes bloqueiam robôs
      console.log(`  ${ok ? '✓' : '✗'} ${res.status} ${full.slice(0, 110)}`);
      if (!ok) problems++;
    } catch (e) {
      fail(`${page}: ${full} → ${e.message}`);
    }
  }
}

console.log(problems ? `\n${problems} problema(s) encontrado(s).` : '\nTudo certo.');
process.exit(problems ? 1 : 0);
