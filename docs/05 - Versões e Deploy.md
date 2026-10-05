# Versões e Deploy

## Situação atual

Existem duas versões publicadas.

### 1. Oficial

URL:
https://appslbm.github.io/TRIMMOS/inicio.html

Fonte:
`appslbm/TRIMMOS`

Branch:
`main`

Commit de referência:
`a5f298c`

Essa versão permanece intacta durante a avaliação.

### 2. Demonstração

URL:
https://appslbm.github.io/TRIMMOS-preview/inicio.html

Fonte:
`appslbm/TRIMMOS-preview`

A demonstração é destinada à avaliação do proprietário.

## Por que existem duas versões?

Para permitir a comparação:

**ANTES → versão oficial**

**DEPOIS → versão modernizada**

Sem risco de derrubar o site que está atualmente em produção.

## Noindex do preview

A versão de demonstração possui `noindex, nofollow` intencionalmente.

Isso evita que a versão de avaliação concorra com o site oficial nos mecanismos de busca.

O SEO da demo não deve ser avaliado pelo índice de SEO como se fosse produção.

## Processo de aprovação

### Enquanto não houver aprovação

- Alterações ficam no preview.
- Não fazer merge para a `main` oficial.
- Proprietário pode comparar as versões.
- Solicitações novas devem ser aplicadas primeiro no preview.

### Depois da aprovação

1. Registrar aprovação.
2. Registrar alterações finais.
3. Testar a versão final.
4. Fazer revisão de código.
5. Fazer merge/publicação.
6. Validar o site oficial.
7. Confirmar que a URL oficial está servindo a versão aprovada.

## Backup

Backup anterior à modernização:

- `C:\Projetos\backups\TRIMMOS-backup-versao-atual.zip`
- `C:\Projetos\backups\TRIMMOS-backup-versao-atual.bundle`
- Tag local: `TRIMMOS-backup-versao-atual`

O backup corresponde à versão original antes da modernização.

---

← [[04 - Git e GitHub|Anterior]] · [[00 - Início|Início]] · [[06 - Conteúdo e Identidade|Próxima]] →
