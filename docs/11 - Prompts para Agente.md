# Prompts para Agente

## Regra

Antes de pedir ao agente qualquer operação no GitHub, deixar explícito:
- qual repositório pode ser alterado;
- qual branch pode ser alterada;
- qual repositório/branch é intocável;
- se pode fazer commit;
- se pode fazer push;
- se pode fazer merge.

## Prompt — Revisão antes de alterar

```text
Antes de fazer qualquer alteração, analise o estado atual do repositório e me informe:
- branch atual;
- status do Git;
- commits recentes;
- diferenças em relação à main;
- arquivos que serão alterados.

Não faça commit, push ou merge até eu autorizar.
```

## Prompt — Alteração somente no preview

```text
Faça esta alteração somente na versão de demonstração.

Repositório permitido:
appslbm/TRIMMOS-preview

Não altere:
appslbm/TRIMMOS
main do TRIMMOS
GitHub Pages do TRIMMOS

Teste a alteração localmente e informe os arquivos modificados e os testes realizados antes de publicar.
```

## Prompt — Publicação definitiva

Usar somente depois da aprovação explícita do proprietário.

```text
O proprietário aprovou a versão de demonstração.

Agora prepare a publicação definitiva.

Antes de qualquer merge:
1. Verifique o estado atual do TRIMMOS.
2. Confirme o commit da main.
3. Compare a versão aprovada com a versão de produção.
4. Mostre o diff.
5. Não faça merge ainda.

Depois de eu confirmar o diff, faça o merge/publicação autorizado.

Após publicar:
- valide a URL oficial;
- valide CSS, JS, imagens e links;
- teste mobile;
- verifique console;
- confirme o commit final da main;
- informe exatamente o que foi publicado.
```

## Prompt — Não alterar produção

```text
IMPORTANTE: não altere o repositório appslbm/TRIMMOS nem sua main.

Esta tarefa deve ser executada somente no preview.

Se alguma etapa exigir alteração no repositório oficial, pare e me informe antes de continuar.
```

---

← [[10 - Histórico de Decisões|Anterior]] · [[00 - Início|Início]] · [[12 - Trabalho em Equipe|Próxima]] →
