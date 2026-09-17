---
# Copie este arquivo para src/content/wiki/<nome-da-pagina>.md
# O nome do arquivo vira o endereço: /wiki/<nome-da-pagina>/
title: Título da página
description: Uma frase curta (até ~160 caracteres) que resume a página. Aparece no Google e nos cartões.
# slug de uma categoria de src/data/categories.ts
# (comecando, personagem, combate, mundo, itens, social, ajuda)
category: combate
# ordem dentro da categoria (menor aparece primeiro)
order: 10
keywords: [palavra-chave 1, palavra-chave 2]
# imagem opcional, dentro de public/ (ex.: /img/jutsus/rasengan.png)
# image: /img/exemplo.png
# imageAlt: Descrição da imagem para acessibilidade
# confirmado | parcial (tem trechos pendentes) | rascunho (não publica)
status: rascunho
updated: 2026-09-14
# nomes de arquivos (sem .md) de páginas relacionadas — precisam existir
related: [jutsus, combate]
# true = aparece em "Principais sistemas" na página inicial
popular: false
---

Parágrafo de introdução: **o que é** e **para que serve**.

## Como desbloquear

Explique requisitos (level, rank, item, VIP…).

## Como usar

1. Passo um.
2. Passo dois.

## Tabela de exemplo

| Coluna | Coluna |
|---|---|
| valor | valor |

<div class="callout callout--dica">
<p class="callout__title">Dica</p>

Texto da dica. Deixe uma linha em branco antes e depois do texto.

</div>

<div class="callout callout--pendente">
<p class="callout__title">Pendente de revisão</p>

Use esta caixa para qualquer informação que ainda não foi confirmada nos arquivos do jogo.

</div>

Outros tipos de caixa: `callout--info`, `callout--aviso`, `callout--exemplo`, `callout--confirmado`.

## Links internos

Use sempre o endereço completo com barra final: [Jutsus](/wiki/jutsus/).
