# Ambiente de Desenvolvimento

## Pré-requisitos

- Node.js **22.12 ou mais recente** (exigido em `package.json` → `engines`, mesma exigência do Astro; o deploy no GitHub Actions usa Node 24)
- npm
- Git
- GitHub
- Editor de código

Para conferir a versão instalada:

```bash
node -v
```

## Clonar o projeto

> [!warning] Situação temporária: até a modernização ser aprovada e entrar na `main`
> A `main` do `appslbm/TRIMMOS` ainda contém a **versão anterior** do site (HTML/CSS estático, sem `package.json`). Nela, `npm install` e os demais comandos `npm` desta nota **não funcionam**.
>
> A branch **`docs/obsidian-vault`** está **publicada no GitHub** (`appslbm/TRIMMOS`) e contém o **código modernizado + esta documentação do Obsidian**. É a branch que deve ser usada em um clone novo do repositório.

### Onde está cada versão (conferido em 2026-10-04)

| Local | Conteúdo |
|---|---|
| `appslbm/TRIMMOS` → `main` | Versão anterior, **em produção** |
| `appslbm/TRIMMOS` → `docs/obsidian-vault` | Código modernizado + documentação do Obsidian (`docs/`). **Publicada no GitHub. Use esta branch em um clone novo** |
| `appslbm/TRIMMOS-preview` → `main` | Código modernizado, **sem** a pasta `docs/`. Publica a versão de demonstração |
| `feature/modernizacao-site` | Branch **somente local** (computador onde a modernização foi feita). **Não está publicada no GitHub**: não use em um clone novo |

### Para trabalhar na versão modernizada agora (novo colaborador)

```bash
git clone https://github.com/appslbm/TRIMMOS.git
cd TRIMMOS
git switch docs/obsidian-vault
npm install
```

Depois, no Obsidian, use **Abrir pasta como vault** (*Open folder as vault*) e selecione a pasta **`TRIMMOS/docs`**. Comece pela nota [[00 - Início]].

O repositório `appslbm/TRIMMOS-preview` pode ser clonado **só para consulta ou teste local** do código modernizado. Não faça push nele sem combinar: cada push na `main` do `TRIMMOS-preview` publica a versão de demonstração.

**Ninguém trabalha diretamente na `main`.** Toda alteração é feita em uma branch de trabalho (ver [[04 - Git e GitHub]] e [[12 - Trabalho em Equipe]]).

### Depois da aprovação (fluxo normal)

Quando a modernização for aprovada e entrar na `main`, este aviso pode ser removido e a instrução volta a ser simplesmente:

```bash
git clone https://github.com/appslbm/TRIMMOS.git
cd TRIMMOS
```

Em seguida, crie uma branch de trabalho antes de qualquer alteração.

## Instalar dependências

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O projeto foi utilizado localmente na porta 4321 durante o desenvolvimento.

## Build

```bash
npm run build
```

## Preview de produção

```bash
npm run build
npm run preview
```

## Verificações

```bash
npm run check -- --external
```

Também podem ser utilizados os comandos de verificação definidos no `package.json`:

| Comando | O que faz |
|---|---|
| `npm run check` | Valida o HTML gerado, os links internos e as âncoras (rodar depois do `npm run build`) |
| `npm run check -- --external` | Igual ao anterior e também testa os links externos (WhatsApp, Instagram, agendamento etc.) |
| `npm run typecheck` | Verifica os tipos TypeScript e os componentes Astro (`astro check`) |

## Antes de enviar alterações

- Verificar build.
- Verificar links.
- Verificar console.
- Testar mobile.
- Confirmar que não há rolagem horizontal.
- Verificar imagens.
- Verificar CTAs.
- Confirmar que a `main` não será alterada indevidamente.

---

← [[01 - Visão do Projeto|Anterior]] · [[00 - Início|Início]] · [[03 - Estrutura do Projeto|Próxima]] →
