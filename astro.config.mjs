// @ts-check
import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Qual barbearia gerar. Cada cliente fica em clients/<nome>/.
 *   Bash:        CLIENT=exemplo npm run build
 *   PowerShell:  $env:CLIENT="exemplo"; npm run build
 * Sem CLIENT, gera a Trimmos.
 */
const client = process.env.CLIENT || 'trimmos';
const clientDir = fileURLToPath(new URL(`./clients/${client}/`, import.meta.url));

if (!existsSync(`${clientDir}site.config.ts`)) {
  throw new Error(`Cliente "${client}" não encontrado: crie clients/${client}/site.config.ts`);
}

const { default: siteConfig } = await import(`./clients/${client}/site.config.ts`);

/**
 * Publicação: por padrão usa clients/<cliente>/site.config.ts (deploy.site / deploy.base).
 * Pode ser sobrescrita no deploy, sem mexer no conteúdo:
 *   DEPLOY_SITE=https://usuario.github.io  DEPLOY_BASE=/outro-repo
 *   PREVIEW=true  → versão de demonstração: "noindex" em todas as páginas.
 */
const deploySite = process.env.DEPLOY_SITE || siteConfig.deploy.site;
const deployBase = process.env.DEPLOY_BASE ?? siteConfig.deploy.base;
const preview = process.env.PREVIEW === 'true';

export default defineConfig({
  site: deploySite,
  base: deployBase || '/',
  // Gera index.html, inicio.html, services.html — mantém as URLs atuais funcionando.
  build: { format: 'file', inlineStylesheets: 'always' },
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  vite: {
    resolve: { alias: { '@client': clientDir } },
    define: {
      'import.meta.env.CLIENT_NAME': JSON.stringify(client),
      'import.meta.env.SITE_PREVIEW': JSON.stringify(preview),
    },
  },
});
