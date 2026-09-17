---
title: Rankings, karma e reputação
description: Os rankings do servidor, como o karma separa Heróis e Assassinos e para que serve a reputação.
category: social
order: 5
keywords: [ranking, top, top level, top pvp, top char, karma, herói, assassino, reputação, moeda de reputação]
updated: 2026-09-14
status: parcial
related: [pk-e-pvp, torneios-e-guerras, monstros, moedas-e-lojas]
---

## Rankings

Use o comando `/top` para ver os rankings. Eles são atualizados automaticamente.

| Ranking | Vagas | Critério |
|---|---|---|
| **Top Level** | 20 | maior level |
| **Top Herói** | 10 | maior karma positivo |
| **Top Assassino (PK)** | 10 | karma mais negativo |
| **Top PvP** | 10 | vitórias em duelos 1x1 nas arenas |
| **Top Char** | 1 por personagem | o jogador de destaque de cada personagem |

Ao subir de posição no Top Level, o servidor anuncia: *"<nome> subiu para o Nº lugar no TopLevel"*.

<div class="callout callout--pendente">
<p class="callout__title">Pendente de revisão</p>

O critério exato do **Top Char** ainda está sendo verificado.

</div>

## Karma — Herói ou Assassino

Cada vitória contra outro jogador, fora de eventos, muda o seu **karma**:

- derrotar alguém com karma **positivo ou zero** **diminui** o seu karma (caminho do **Assassino**);
- derrotar alguém com karma **negativo** **aumenta** o seu karma (caminho do **Herói**);
- o karma da vítima se aproxima de zero.

Quanto mais extremo o karma da vítima, mais pontos a vitória vale:

| Karma da vítima (positivo ou negativo) | Pontos |
|---|---|
| até 100 | 1 |
| 101 a 300 | 5 |
| 301 a 500 | 10 |
| 501 a 1.000 | 15 |
| 1.001 a 3.000 | 20 |
| 3.001 a 5.000 | 30 |
| acima de 5.000 | 50 |

- Com o **PK 3** ligado, as vitórias não alteram o karma.
- Derrotar a mesma pessoa várias vezes em pouco tempo não conta karma.

### Transferir karma
É possível enviar karma para outro jogador (mínimo de 10). O envio **custa 3.000 Cash** e não funciona em torneios. Quem recebe responde com `/aceitarkarma` ou `/recusarkarma`.

O item **Inverter Karma** troca o sinal do seu karma.

## Reputação

- Você ganha **pontos de reputação** ao derrotar monstros e chefes que dão reputação.
- A reputação volta a zero nos [resets de level alto](/wiki/reset/).
- A **Moeda de Reputação** é um item diferente: é a moeda do **Mercado REPUTAÇÃO** e vem de eventos. Veja [Moedas e lojas](/wiki/moedas-e-lojas/).
