# Estrutura do Projeto

A estrutura exata pode evoluir. Use esta nota como mapa inicial e atualize quando houver mudanças importantes.

## Principais áreas

```text
TRIMMOS/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── clients/
│   ├── trimmos/
│   │   ├── site.config.ts
│   │   └── assets/
│   └── exemplo/
│       ├── site.config.ts
│       └── assets/
├── docs/
├── public/
├── scripts/
│   ├── check.mjs
│   └── placeholders.mjs
├── src/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── ...
```

`docs/` é esta documentação (Vault do Obsidian). Ela não faz parte do site publicado.

## Arquivos relevantes

### `astro.config.mjs`

Configuração do Astro e do endereço/base do site.

A versão de preview utiliza variáveis de ambiente para gerar o caminho `/TRIMMOS-preview/`.

### `src/layouts/Base.astro`

Layout/base compartilhado pelas páginas.

No modo de demonstração, recebe as regras de `noindex`/`nofollow` e remove o canonical para evitar indexação da versão de preview.

### `src/lib/site.ts`

Configurações e dados compartilhados do site.

URLs absolutas devem acompanhar o ambiente de publicação.

### `src/pages/services.astro`

**Não é uma página de serviços independente.**

Ele existe apenas para manter funcionando a URL antiga `services.html` (de links já compartilhados): ao ser aberta, ela **redireciona para `inicio.html#servicos`**, a seção de serviços do site.

Para alterar serviços e preços, edite `clients/trimmos/site.config.ts` (ver abaixo).

### `clients/trimmos/site.config.ts`

Arquivo com **todo o conteúdo e a configuração da Trimmos**: nome, contatos (WhatsApp, Instagram), link de agendamento, endereço e Place ID do Google, horários, serviços e preços, avaliações, equipe, galeria, textos e cor de destaque.

- As imagens ficam em `clients/trimmos/assets/` (logo, foto do ambiente, fachada e as pastas `equipe/` e `galeria/`).
- O conteúdo é validado no build por `src/lib/schema.ts`: se um campo obrigatório estiver faltando ou em formato errado, o build para com uma mensagem indicando o campo.
- Ao alterar preços, horários ou equipe aqui, atualize também [[06 - Conteúdo e Identidade]].

`clients/exemplo/` é um cliente **fictício**, usado para demonstrar e testar o template. Suas imagens são geradas por `scripts/placeholders.mjs`.

### `src/components/`

Seções e elementos do site, compartilhados entre os clientes:

| Componente | Função |
|---|---|
| `Header.astro` | Cabeçalho fixo com logo, menu (desktop) e botão de agendar |
| `Hero.astro` | Primeira tela: nome, frase, botões de agendamento/WhatsApp, nota e horário |
| `Services.astro` | Serviços e preços |
| `Team.astro` | Equipe |
| `Reviews.astro` | Avaliações |
| `Showcase.astro` | "Cortes da casa", com links para as publicações do Instagram |
| `Gallery.astro` | Galeria de fotos |
| `About.astro` | Sobre a barbearia e vídeo |
| `Location.astro` | Endereço, contato, horários, foto da fachada e mapa |
| `FinalCta.astro` | Chamada final para agendar |
| `Footer.astro` | Rodapé |
| `MobileBar.astro` | Barra fixa de agendamento no celular |
| `OpenStatus.astro` | Indicação "Aberto agora / Fechado agora" |
| `VideoFacade.astro` | Vídeo do YouTube carregado somente ao tocar |
| `Icon.astro` | Ícones SVG |

### `src/styles/global.css`

Design system do site: variáveis de cor, tipografia, espaçamentos, bordas, botões, cards e utilitários.

As cores da marca (destaque, fundo, texto) vêm da configuração do cliente (`theme` em `site.config.ts`) e são aplicadas pelo `src/layouts/Base.astro`.

### `scripts/check.mjs`

Script de verificação de HTML, links e referências.

### `.github/workflows/deploy.yml`

Workflow utilizado para publicação no GitHub Pages.

O endereço é calculado pelo repositório em que o workflow está sendo executado.

---

← [[02 - Ambiente de Desenvolvimento|Anterior]] · [[00 - Início|Início]] · [[04 - Git e GitHub|Próxima]] →
