# Trabalho em Equipe

Como trabalhar no projeto (código e documentação) a duas pessoas sem perder trabalho nem afetar a produção.

## Onde registrar cada coisa

| O quê | Onde | Como |
|---|---|---|
| **Decisão** (algo que muda o rumo do projeto, uma regra ou um dado oficial) | [[10 - Histórico de Decisões]] | Nova entrada **no fim da nota**, no formato `## AAAA-MM-DD — Título`, com **Decisão** e **Motivo** |
| **Pendência** (algo a fazer ou a confirmar) | [[09 - Pendências]] | Item `- [ ]` na seção certa. Ao concluir, marcar `- [x]` em vez de apagar |
| **Alteração no código ou no site** | Mensagem do commit no Git | Commit pequeno e com mensagem clara (ex.: `Ajusta seção de serviços no mobile`). O histórico do Git é o registro das alterações |
| **Alteração que muda um dado ou uma regra** | Commit + nota correspondente | Ex.: preço ou horário → [[06 - Conteúdo e Identidade]]; nova regra → [[07 - Regras do Projeto]]; nova pasta ou arquivo importante → [[03 - Estrutura do Projeto]] |
| **Instruções para o agente (IA)** | [[11 - Prompts para Agente]] | Adicionar um novo bloco de prompt |

Regra: **não inventar informações**. O que não estiver confirmado é registrado como **A CONFIRMAR** em [[09 - Pendências]].

## Como atualizar a documentação

1. A documentação fica em `docs/`, dentro do repositório. Ela é versionada no Git junto com o código.
2. Abra a pasta `docs/` como Vault no Obsidian (veja o [[README]]).
3. Edite as notas normalmente. Para ligar notas, use `[[Nome da Nota]]`.
4. Se a alteração de documentação acompanha uma mudança de código, faça o commit **junto** com a mudança de código. Se for só documentação, faça um commit separado (ex.: `docs: registra decisão sobre horários`).
5. Não renomeie notas sem combinar: outras notas apontam para elas pelo nome.

## Fluxo Git do dia a dia

```bash
# 1. Ver onde você está e se há algo pendente
git status
git branch --show-current

# 2. Atualizar antes de começar
git pull

# 3. Criar uma branch para a tarefa (nunca trabalhar direto na main)
git switch -c feature/nome-da-tarefa      # código
git switch -c docs/nome-da-tarefa         # só documentação

# 4. Depois de editar: revisar e adicionar arquivos específicos
git status
git diff
git add caminho/do/arquivo

# 5. Commit pequeno e objetivo
git commit -m "Descreve o que mudou"

# 6. Enviar a branch de trabalho (não a main)
git push -u origin feature/nome-da-tarefa
```

- No repositório oficial `appslbm/TRIMMOS`, o GitHub Pages publica **somente a `main`**. Enviar outras branches não altera o site oficial.
- **Nunca** fazer push ou merge para a `main` do `TRIMMOS` sem autorização explícita (ver [[04 - Git e GitHub]] e [[05 - Versões e Deploy]]).
- Prefira `git add caminho/do/arquivo` a `git add .`, para não incluir arquivos por engano.

### Atualizar a versão de demonstração (preview)

O preview é publicado automaticamente (GitHub Actions) a cada push na `main` do repositório `appslbm/TRIMMOS-preview`.

```bash
# Uma única vez, em cada computador:
git remote add preview https://github.com/appslbm/TRIMMOS-preview.git

# Publicar no preview a branch de trabalho:
git push preview feature/modernizacao-site:main
```

Isso altera **somente** o preview. O repositório oficial não é afetado.

## Como evitar conflitos

- **Combinar antes** quem vai editar qual nota ou qual parte do código.
- **`git pull` antes de começar** e antes de enviar.
- **Commits pequenos e frequentes**: quanto menor a mudança, mais fácil juntar o trabalho dos dois.
- Em [[09 - Pendências]] e [[10 - Histórico de Decisões]], **acrescente** entradas, sem reorganizar ou reformatar o que já existe.
- Não reformatar notas inteiras (trocar títulos, reordenar seções) sem combinar: isso gera conflito em tudo o que o outro editou.
- Os arquivos de layout pessoal do Obsidian (`.obsidian/workspace*.json`) ficam fora do Git, para que cada um possa organizar as janelas sem gerar conflito.

### Se acontecer um conflito

1. O Git mostra os arquivos em conflito em `git status`.
2. Abra o arquivo: os trechos aparecem entre `<<<<<<<`, `=======` e `>>>>>>>`.
3. Em notas de registro (pendências, decisões), normalmente o certo é **manter as duas versões**.
4. **Nunca descarte o texto do outro sem conversar.**
5. Remova os marcadores, salve, faça `git add` do arquivo e conclua com `git commit`.

## Como revisar antes de enviar

1. `git status`: só os arquivos esperados foram alterados?
2. `git diff` (ou `git diff --staged` depois do `git add`): leia linha por linha o que vai ser enviado.
3. Se mudou o site: siga o [[08 - Checklist de Alterações]] e rode:
   ```bash
   npm run build
   npm run check
   ```
4. Se mudou a documentação: abra no Obsidian e confira se os links `[[...]]` funcionam (link quebrado aparece com cor diferente).
5. Mudança que afeta produção, preços, horários ou decisões: **o outro revisa antes** do envio.
6. Produção só com aprovação do proprietário ([[05 - Versões e Deploy]]).

---

← [[11 - Prompts para Agente|Anterior]] · [[00 - Início|Início]]
