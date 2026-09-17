# Auditoria do jogo — Naruto Inner Power (Elysium Engine)

> Relatório interno de auditoria **somente leitura**, usado como base da wiki.
> Este arquivo **não é publicado** no site (fica fora de `src/` e `public/`).
> Nenhuma credencial, IP, login, senha, token ou comando administrativo foi copiado para cá.
> Data: 14/09/2026.

---

## 1. Estrutura identificada

| Pasta / arquivo (em `NIP\`) | Conteúdo |
|---|---|
| `src\*.bas`, `src\*.frm`, `src\clsBuffer.cls` | código-fonte VB6 do **servidor** (≈ 30 módulos) |
| `server.vbp` | projeto VB6 do servidor |
| `data\` | dados ativos do servidor: `items`, `npcs`, `spells`, `quests`, `maps`, `shops`, `resources`, `orgs`, `animations`, `classes.ini`, `options.ini` |
| `Server\data\` | cópia antiga e parcial dos dados (não usada pelo executável da raiz) |
| `sv12 update\` | cópia antiga do código-fonte |
| `Tops\` | rankings salvos (contêm nomes de jogadores — **não publicar**) |
| `pix-server\` | serviço Node de pagamento PIX (**não publicar**) |
| `Noticias.txt` | notícias e regras para jogadores (publicável em resumo) |
| `*.bat`, `*.exe` | scripts de operação e executáveis |

**O código do cliente do jogo não está nesta máquina.** Tudo que depende da interface (nomes de botões, teclas, textos de comandos, sprites, cores de raridade) foi marcado como pendente.

## 2. Tecnologias

- **Servidor:** Visual Basic 6, motor Elysium / Eclipse Origins (MMORPG 2D por tiles).
- **Dados:** arquivos binários VB6 (`Put`/`Get` de estruturas `Type`) e `.ini`; texto em Windows-1252.
- **Pagamento:** serviço separado em Node.js (fora do escopo da wiki).
- **Wiki:** Astro 5 + TypeScript + Markdown, busca Pagefind, saída estática para Cloudflare Pages.

## 3. Sistemas encontrados e evidências

Evidências no formato `arquivo:linha` (código do servidor, `NIP\src`).

| Sistema | Evidência principal | Página da wiki |
|---|---|---|
| Nome do jogo, MOTD | `data\options.ini`; `modDatabase.bas:111` | O que é |
| Criação de personagem (nome, classe 1–15, vila, elemento) | `modHandleData.bas:576-639`, `modDatabase.bas:334-439` | Criação do personagem |
| 56 personagens, estilo Tai/Nin | `modConstants.bas:233-288`, `data\classes.ini`, `modGameLogic.bas:6068-6080` | Personagens jogáveis |
| Troca de personagem, pergaminhos, char fixo, Char Supremo/Especial/BKS | `modGameLogic.bas:6329-6425`, `9822-9860`, `10211-10250`; `modHandleData.bas:742-775`, `1441-1471`; `modScriptedItem.bas` | Personagens jogáveis |
| Coleção de vocações (level/EXP/atributos/pontos/reset por vocação) | `modVocacoes.bas`, `modHandleData.bas:167-185` | Coleção de vocações |
| Atributos e efeitos | `modEnumerations.bas:238-246`, `modCombat.bas:8-223`, `modHandleData.bas:1961-2002` | Atributos |
| Level, EXP, pontos, marcos | `modPlayer.bas:1491-1761`, `modConstants.bas:39` | Níveis e experiência |
| Reset (1000, itens 60K–150K, Resetar Stats) | `modPlayer.bas:257-311`, `1609-1663`; `modScriptedItem.bas:775-799`, `1379-1455`; `modGameLogic.bas:6787-6815` | Reset |
| Ranks e exames | `modConstants.bas:205-213`, `modGameLogic.bas:6454-6566`, `modScriptedNPC.bas`, `modScriptedQuest.bas` | Ranks ninja |
| Transformações e dojutsu | `modGameLogic.bas:2162-4204`, `modHandleData.bas:4778-4821`, `modScriptedSpell.bas` | Transformações e Dojutsu |
| Elementos | `modGameLogic.bas:6082-6100`, `6234-6308` | Elementos |
| Combate básico, esquiva/defesa/crítico, morte | `modCombat.bas:54-1730`, `modPlayer.bas:2106-2217`, `2527-2543` | Combate |
| Jutsus (tipos, requisitos, alvo automático, aprendizado) | `modConstants.bas:163-171`, `modCombat.bas:1736-2410`, `modGameLogic.bas:1392-1572`, `5606-6040` | Jutsus |
| PK, PvP, Berserker | `modCombat.bas:1352-1539`, `modHandleData.bas:5446-5476`, `7154-7193` | PK e PvP |
| Invocações | `modCombat.bas:2756-2850`, `modGameLogic.bas:4538-4551` | Invocações |
| Grupo, organizações | `modGameLogic.bas:783-943`, `9373-9661`, `4802-4938`; `modConstants.bas:215-231` | Grupos e organizações |
| Vilas, Kage, Líder, KS | `modGameLogic.bas:6102-6126`, `6568-6700`, `8797-9179`; `modHandleData.bas:1237-1264` | Vilas, Kage e Líder |
| Eventos e agenda | `modGameLogic.bas:6827-8080`, `modServerLoop.bas:285-373`, `modQuickQuestion.bas` | Eventos |
| Torneios, guerra, desafios, arenas | `modGameLogic.bas:8398-9382`, `modHandleData.bas:5579-6642`, `modPlayer.bas:3951-4553` | Torneios e guerras |
| Rankings, karma, reputação | `modPlayer.bas:3815-3949`, `modGameLogic.bas:4979-5249`, `10144-10209`; `modCombat.bas:842-847` | Rankings, karma e reputação |
| Itens, equipamentos, raridade, upgrades | `modConstants.bas:125-135`, `modPlayer.bas:1419-1434`, `2553-3108`; `data\shops` | Itens e equipamentos |
| Moedas e lojas | `modHandleData.bas:3742-3861`, `data\shops`, `modDonateShop.bas` | Moedas e lojas |
| Banco e trocas | `modConstants.bas:31,40`, `modHandleData.bas:3955-4508` | Banco e trocas |
| VIP, CT, loja Donate | `modCombat.bas:523-524`, `modHandleData.bas:2186-2278`, `modPlayer.bas:4555-4658`, `modDonateShop.bas` | VIP e benefícios |
| Treinamento e recursos | `modPlayer.bas:2223-2389` | Treinamento |
| Missões | `data\quests`, `modGameLogic.bas` (quests), `modScriptedQuest.bas` | Missões |
| Mapas e regiões | `data\maps` (289 mapas; 105 seguros, 184 PvP), `modScriptedMap.bas:209-357` | Mapa do mundo |
| Monstros, chefes, bijuus | `data\npcs` (238 NPCs; 72 chefes), `modCombat.bas:694-774` | Monstros, Chefes, Bestas com Cauda |
| Chat, amigos, comandos | `modHandleData.bas:656-1642`, `5132-5270`, `6242-6898` | Interface e controles |

**Sistemas que NÃO existem no jogo** (buscas sem resultado): crafting, forja, refino, encantamento, profissões, coleta como profissão, montarias (o "voar" é só visual de algumas transformações), conquistas, recompensas diárias, dungeons instanciadas e raids formais. Por isso essas categorias não foram criadas.

## 4. Arquivos de origem consultados

- Todo `NIP\src\` (módulos citados acima).
- `NIP\data\classes.ini`, `NIP\data\options.ini` (somente o nome do jogo e o MOTD).
- `NIP\data\items`, `npcs`, `spells`, `quests`, `maps`, `shops`, `resources` — decodificados por script somente leitura, com os layouts de `modTypes.bas`.
- `NIP\Noticias.txt`.
- Listagem (sem extrair) de `Vocs.zip` e `pix-server.zip` para procurar imagens.

## 5. Informações incompletas ou conflitantes (pendentes de revisão)

1. **Cliente ausente** — texto exato de comandos "/", nomes de botões e menus, cores das raridades, imagens.
2. **Qual executável está em produção** — a coleção de vocações só existe no build mais recente do servidor.
3. **Local de nascimento** — o personagem é gravado no mapa inicial, mas o login leva a outro mapa.
4. **Bônus de VIP/CT na criação** — provavelmente não é aplicado; omitido da wiki.
5. **Nomes dos níveis de VIP** — "Light/OhYeh" no código antigo e "OhYeh/Supremo" na loja Donate. A wiki usa "nível 1 / nível 2".
6. **Estilo de luta do Darui** — não definido (usa as regras de Ninjutsu).
7. **Pergaminhos de Pain, Madara, Sasori e Boruto** — sem script associado.
8. **Recompensa do reset de 150K** e **itens do Teste Jounin**.
9. **Critério do Top Char** — comparação de level desativada no código.
10. **Kage Shiken** — ativado manualmente; indício de sábado.
11. **Eventos "Temos que pegar" e "Bayou"** — ativação manual e prêmios inconsistentes ou desativados.
12. **Criação de organizações privadas** — item de criação não identificado.
13. **Comportamento de NPCs** — crítico de NPC, regeneração após dano e agressividade de guardas parecem ter defeitos.

## 6. Conteúdo que não deve ser publicado (somente categorias)

1. Credenciais, chaves, tokens, domínios, endpoints e banco de dados do sistema de pagamento.
2. Endereços IP, portas e configurações de rede ou firewall.
3. Dados de contas: logins, senhas, listas de personagens, banidos, Kages, Líderes e Lendários.
4. Nomes de jogadores reais em rankings e logs.
5. Comandos, pacotes, itens e níveis de acesso da equipe (staff/GM).
6. Mecanismos antifraude e anti-cheat.
7. Respostas da Pergunta Rápida.
8. Defeitos e brechas encontrados no código (reportados à equipe no relatório de entrega, fora da wiki).
9. Conteúdo de teste (NPCs, itens e mapas de teste ou piada).
10. Taxas internas exatas de esquiva, crítico e drop, e fórmulas de dano (a wiki explica em linguagem de jogador).

## 7. Estrutura da wiki (implementada)

| Categoria | Páginas |
|---|---|
| Começando | O que é · Primeiros passos · Criação do personagem · Guia rápido · Interface e controles |
| Personagem e progressão | Personagens jogáveis · Coleção de vocações · Atributos · Níveis e experiência · Reset · Ranks ninja · Transformações e Dojutsu · Elementos |
| Combate e jutsus | Combate · Jutsus · PK e PvP · Invocações |
| Mundo, missões e inimigos | Mapa do mundo · Missões · Monstros · Chefes · Bestas com Cauda |
| Itens e economia | Itens e equipamentos · Moedas e lojas · Banco e trocas · VIP e benefícios · Treinamento |
| Social, PvP e eventos | Grupos e organizações · Vilas, Kage e Líder · Eventos · Torneios e guerras · Rankings, karma e reputação |
| Ajuda | Perguntas frequentes · Glossário |
