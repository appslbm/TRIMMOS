# Site vitrine para barbearias

Template de site estático para barbearias: **página de links** ("link na bio") + **site de apresentação**
(equipe, avaliações, sobre, localização e horários). O agendamento continua no sistema externo da
barbearia (Frizzar, Trinks, AppBarber...). Sem backend, sem banco de dados, hospedagem gratuita.

Cliente atual: **Trimmos Barbearia** (antiga Barbearia Hunziker) — Bauru/SP.

| Página | URL | Para quê |
|---|---|---|
| Links | `/index.html` | Porta de entrada de quem vem do Instagram/WhatsApp |
| Site | `/inicio.html` | Avaliações, endereço e horários (serviços e preços ficam no app de agendamento) |
| `/services.html` | redireciona para `/inicio.html` | Mantém links antigos funcionando |

## Como funciona

```
clients/
  trimmos/
    site.config.ts   ← TODO o conteúdo e a configuração da barbearia
    assets/          ← logo e fotos (otimizadas automaticamente no build)
  exemplo/           ← cliente fictício para demonstração e testes
src/
  components/        ← seções do site (iguais para todos os clientes)
  layouts/Base.astro ← <head>: SEO, Open Graph, dados estruturados, cores do cliente
  pages/             ← index (links), inicio (site), services (redirect), 404, sitemap, robots
  styles/global.css  ← design system (tokens, tipografia, botões)
  lib/schema.ts      ← o que cada configuração precisa ter (validado no build)
scripts/check.mjs    ← validação de HTML e links
```

- **Conteúdo e configuração** ficam em `clients/<cliente>/site.config.ts`: links (agendamento, WhatsApp,
  Instagram, Maps, avaliações), endereço, horários, serviços e preços, textos, cores e quais seções aparecem.
- **Layout e estilo** ficam em `src/` e são compartilhados por todos os clientes.
- O build **falha com uma mensagem clara** se a configuração tiver erro (preço vazio, horário em formato
  errado, imagem inexistente...). Nada quebrado chega ao ar.
- Seções sem conteúdo não aparecem: **Equipe** só com profissionais cadastrados, **Galeria** só com 4+ fotos.

## Comandos

Requer Node.js 22.12 ou mais recente.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:4321/TRIMMOS/
npm run build      # gera o site em dist/
npm run preview    # serve o dist/ localmente
npm run check      # valida HTML, links internos e âncoras (rode depois do build)
npm run check -- --external   # também testa os links externos
```

Outro cliente (padrão: `trimmos`):

```bash
CLIENT=exemplo npm run build                 # Bash
$env:CLIENT="exemplo"; npm run build         # PowerShell
```

## Criar o site de uma nova barbearia

1. Copie `clients/exemplo/` para `clients/<nome-da-barbearia>/`.
2. Troque as imagens em `assets/` (logo quadrada, foto do ambiente na horizontal, fachada, equipe, cortes).
3. Edite `site.config.ts`. O editor mostra o que cada campo aceita.
4. Rode `CLIENT=<nome> npm run build` e `npm run check -- --dir dist`.
5. Publique o `dist/` (GitHub Pages, Cloudflare Pages ou Netlify; todos gratuitos).

Dicas para a configuração:

- **Place ID do Google** (`location.googlePlaceId`): gera sozinho os links "Como chegar", "Ver no Google"
  e "Deixar avaliação". Encontre em
  [developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id).
- **Link de avaliação oficial**: no Perfil da Empresa no Google, "Pedir avaliações" gera um link curto
  `g.page/r/...` — coloque em `reviews.writeUrl`.
- **Mapa** (`location.mapEmbedUrl`): Google Maps → Compartilhar → Incorporar um mapa → copie só o `src`.
  O mapa só carrega quando o visitante toca nele.
- **Horários**: `[]` = fechado; `null` = ainda não confirmado (aparece "A confirmar").
- **Preço**: `null` mostra "Sob consulta".

## Publicação (GitHub Pages)

O workflow `.github/workflows/deploy.yml` gera e publica a Trimmos a cada push na `main`.
**Antes do primeiro deploy**, em *Settings → Pages → Build and deployment*, mude **Source** para
**GitHub Actions**. (Com a opção antiga "Deploy from a branch", o GitHub publicaria o código-fonte
em vez do site gerado.)

## Backup da versão anterior

A versão original (HTML/CSS estático) está preservada:

- na branch `main` até a aprovação desta versão;
- na tag `TRIMMOS-backup-versao-atual` (commit `a5f298c`);
- em `C:\Projetos\backups\TRIMMOS-backup-versao-atual.zip` e `.bundle` (histórico completo).

Para restaurar: `git checkout TRIMMOS-backup-versao-atual` ou `git clone TRIMMOS-backup-versao-atual.bundle`.
