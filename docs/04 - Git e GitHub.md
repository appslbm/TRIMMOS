# Git e GitHub

## Repositórios

### Produção

`appslbm/TRIMMOS`

URL:
https://github.com/appslbm/TRIMMOS

### Demonstração

`appslbm/TRIMMOS-preview`

URL:
https://github.com/appslbm/TRIMMOS-preview

## Branch oficial

`main`

Estado conhecido da versão oficial:
`a5f298c`

## Branch de desenvolvimento da modernização

`feature/modernizacao-site`

Essa branch foi utilizada para desenvolver a nova versão antes da aprovação.

## Regra de ouro

**Nunca fazer push ou merge para `main` do TRIMMOS sem autorização explícita.**

## `main` = produção

- A `main` do `appslbm/TRIMMOS` é o **site oficial em produção**: o GitHub Pages publica o que estiver nela.
- **Ninguém trabalha, edita ou faz commit diretamente na `main`.**
- A `main` só recebe alterações por **merge de uma branch de trabalho**, depois de revisão e aprovação.
- Se `git branch --show-current` mostrar `main`, **pare** e crie uma branch de trabalho antes de editar qualquer arquivo.

## Fluxo recomendado

```text
1. Branch de trabalho      (criada a partir da main atualizada)
   ↓
2. Alterações              (sempre na branch de trabalho)
   ↓
3. Validação               (testes locais: build, check, mobile)
   ↓
4. Revisão                 (git diff + revisão da outra pessoa)
   ↓
5. Commit                  (na branch de trabalho)
   ↓
6. Push da branch          (nunca da main)
   ↓
7. Preview                 (versão de demonstração, quando aplicável)
   ↓
8. Revisão e aprovação     (do proprietário, para o que for para produção)
   ↓
9. Merge na main           (somente com autorização explícita)
```

## Trabalho em equipe

Quando duas pessoas trabalharem no projeto:

1. Cada pessoa deve saber qual branch está usando.
2. Antes de começar, atualizar o repositório.
3. Fazer commits pequenos e objetivos.
4. Não editar a mesma parte do código simultaneamente sem combinar.
5. Antes de merge, revisar o diff.
6. Nunca apagar trabalho do outro sem conversar.
7. Registrar decisões importantes em [[10 - Histórico de Decisões]].

## Exemplo de atualização

Antes de começar, confira onde você está e atualize:

```bash
git status
git branch --show-current
git pull
```

## Commit

Exemplo completo, **sempre em uma branch de trabalho**:

```bash
# 1. Partir da main atualizada (apenas para criar a branch; não editar na main)
git switch main
git pull

# 2. Criar a branch de trabalho
git switch -c feature/ajusta-servicos-mobile

# 3. Fazer as alterações e validar (ver checklist abaixo)
npm run build
npm run check

# 4. Revisar
git status
git diff

# 5. Commit na branch de trabalho (adicionar arquivos específicos)
git add src/components/Services.astro
git commit -m "Ajusta seção de serviços no mobile"

# 6. Enviar a BRANCH (nunca a main)
git push -u origin feature/ajusta-servicos-mobile
```

Validação completa: [[08 - Checklist de Alterações]].

O merge na `main` só acontece depois da aprovação, com autorização explícita (ver [[05 - Versões e Deploy]]).

## Verificação antes de merge

```bash
git status
git diff
git log --oneline -5
```

---

← [[03 - Estrutura do Projeto|Anterior]] · [[00 - Início|Início]] · [[05 - Versões e Deploy|Próxima]] →
