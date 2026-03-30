# 📖 POUPE — Documentação 2.0

> **Documentação técnica completa** de tudo que foi construído, como funciona e como usar.
> Atualizado em: 27 de março de 2026

---

## 📋 Índice

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Estrutura de Arquivos](#2-estrutura-de-arquivos)
3. [Templates Gerados](#3-templates-gerados)
4. [Motor de Geração de Documentos](#4-motor-de-geração-de-documentos)
5. [Especificações Técnicas dos Templates Excel](#5-especificações-técnicas-dos-templates-excel)
6. [Especificações Técnicas dos Templates Word](#6-especificações-técnicas-dos-templates-word)
7. [Especificações Técnicas dos Templates Marketing](#7-especificações-técnicas-dos-templates-marketing)
8. [Sistema de Design (Identidade Visual)](#8-sistema-de-design-identidade-visual)
9. [Repositório GitHub](#9-repositório-github)
10. [Como Usar os Documentos](#10-como-usar-os-documentos)
11. [Como Regenerar os Documentos](#11-como-regenerar-os-documentos)
12. [Roadmap Futuro](#12-roadmap-futuro)

---

## 1. Visão Geral do Projeto

**POUPE** é um sistema de templates profissionais para gestão financeira, comercial e marketing. O projeto transforma especificações em markdown (`.md`) em **documentos reais e usáveis** nos formatos:

- **`.xlsx`** — Planilhas Excel com fórmulas, validação de dados e formatação profissional
- **`.docx`** — Documentos Word com headers, footers, tipografia e layout corporativo

### O que foi construído

| Aspecto | Detalhes |
|---------|----------|
| **Total de documentos** | 9 documentos profissionais |
| **Formatos** | 3 `.xlsx` + 6 `.docx` |
| **Categorias** | Excel, Word, Marketing |
| **Motor de geração** | Node.js com `docx` e `exceljs` |
| **Identidade visual** | Paleta POUPE (verdes profissionais) |
| **Repositório** | GitHub — `MagalhaDev/poupe.txt` |

---

## 2. Estrutura de Arquivos

```
POUPE.TXT/
├── .git/                          # Repositório Git
├── .gitignore                     # Ignora node_modules, .DS_Store, .env
├── README.md                      # README do repositório GitHub
├── doc2.0.md                      # 📖 Esta documentação
├── documentacao                   # Documentação v1 (plano do app Electron)
├── package.json                   # Dependências Node.js
├── package-lock.json              # Lock file
├── gerar_documentos.mjs           # 🔧 Script principal de geração
├── gerar_templates.sh             # Script shell original
│
├── node_modules/                  # Dependências (não vai pro Git)
│
└── templates/
    ├── excel/                     # 📊 Planilhas Excel
    │   ├── 01_controle_financeiro_mensal.md      # Markdown fonte
    │   ├── 01_controle_financeiro_mensal.xlsx     # ✅ Planilha gerada
    │   ├── 02_planejamento_semanal.md
    │   ├── 02_planejamento_semanal.xlsx           # ✅ Planilha gerada
    │   ├── 03_tracker_metas_okr.md
    │   └── 03_tracker_metas_okr.xlsx              # ✅ Planilha gerada
    │
    ├── word/                      # 📄 Documentos Word
    │   ├── 01_proposta_comercial.md
    │   ├── 01_proposta_comercial.docx             # ✅ Documento gerado
    │   ├── 02_contrato_prestacao_servicos.md
    │   ├── 02_contrato_prestacao_servicos.docx    # ✅ Documento gerado
    │   ├── 03_briefing_projeto.md
    │   └── 03_briefing_projeto.docx               # ✅ Documento gerado
    │
    └── marketing/                 # 📣 Templates de Marketing
        ├── 01_roteiro_vsl.md
        ├── 01_roteiro_vsl.docx                    # ✅ Documento gerado
        ├── 02_copy_pagina_vendas.md
        ├── 02_copy_pagina_vendas.docx             # ✅ Documento gerado
        ├── 03_sequencia_emails_lancamento.md
        └── 03_sequencia_emails_lancamento.docx    # ✅ Documento gerado
```

---

## 3. Templates Gerados

### 📊 Excel (.xlsx)

| # | Arquivo | Descrição | Abas | Recursos Especiais |
|---|---------|-----------|------|-------------------|
| 1 | `01_controle_financeiro_mensal.xlsx` | Controle financeiro pessoal completo | 4 abas: Receitas, Despesas, Resumo Mensal, Metas de Economia | Fórmulas `SUM`, formatação monetária `#,##0.00`, linhas alternadas |
| 2 | `02_planejamento_semanal.xlsx` | Planejamento semanal com todas as tarefas | 1 aba | Dropdowns de validação (Prioridade: Alta/Média/Baixa; Status: Pendente/Em andamento/Concluído), cores por prioridade |
| 3 | `03_tracker_metas_okr.xlsx` | Tracker de Metas e OKRs | 4 abas: Metas Trimestrais, Pessoais, Profissionais, Revisão Mensal | Formato percentual `0%`, dropdowns de status, exemplos preenchidos |

### 📄 Word (.docx)

| # | Arquivo | Descrição | Seções |
|---|---------|-----------|--------|
| 1 | `01_proposta_comercial.docx` | Proposta comercial profissional | Informações Gerais, Resumo Executivo, Escopo, Cronograma, Investimento, Condições de Pagamento, Validade, Assinaturas |
| 2 | `02_contrato_prestacao_servicos.docx` | Contrato de prestação de serviços | Partes (Contratante/Contratado), Objeto, Obrigações, Prazo, Valor, Pagamento, Confidencialidade, Rescisão, Foro, Assinaturas + Testemunhas |
| 3 | `03_briefing_projeto.docx` | Briefing completo de projeto | 11 seções: Cliente, Objetivo, Público-Alvo, Tom de Voz, Referências Visuais, Entregáveis, Prazos, Orçamento, Concorrentes, Diferenciais, Observações |

### 📣 Marketing (.docx)

| # | Arquivo | Descrição | Conteúdo |
|---|---------|-----------|----------|
| 1 | `01_roteiro_vsl.docx` | Roteiro para Video Sales Letter | 9 seções cronológicas: Gancho (30s), Problema (1-2min), Agitação (2-3min), Solução (3-4min), Prova Social (4-5min), Benefícios (5-6min), Oferta (7-10min), CTA, Urgência |
| 2 | `02_copy_pagina_vendas.docx` | Copy para landing page de vendas | 9 seções: Headline, Sub-headline, Dor/Problema, Solução, Lista de Benefícios, Oferta com Preço, Garantia, FAQ, CTA Final |
| 3 | `03_sequencia_emails_lancamento.docx` | Sequência de 5 emails de lançamento | Email 1: Aquecimento, Email 2: Conteúdo de Valor, Email 3: Prova Social, Email 4: Abertura de Carrinho, Email 5: Último Dia |

---

## 4. Motor de Geração de Documentos

### Arquivo: `gerar_documentos.mjs`

Script Node.js (ESM) que converte os templates markdown em documentos reais. **Tamanho: ~45KB, ~600 linhas.**

### Dependências

```json
{
  "docx": "^9.x",     // Geração de documentos .docx (Word)
  "exceljs": "^4.x"   // Geração de planilhas .xlsx (Excel)
}
```

### Como funciona

```
┌─────────────────────────────────────────────────────┐
│                  gerar_documentos.mjs                │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. Define paleta de cores POUPE                     │
│  2. Define funções utilitárias de formatação          │
│     ├── titleParagraph()    → Títulos                │
│     ├── subtitleParagraph() → Subtítulos             │
│     ├── bodyParagraph()     → Texto corpo            │
│     ├── bulletParagraph()   → Bullet points          │
│     ├── fieldParagraph()    → Campos editáveis       │
│     ├── createDocxTable()   → Tabelas formatadas     │
│     ├── createHeader()      → Header do documento    │
│     └── createFooter()      → Footer com paginação   │
│                                                      │
│  3. Funções de criação DOCX (Word)                   │
│     ├── createPropostaComercial()                    │
│     ├── createContratoPrestacao()                    │
│     ├── createBriefingProjeto()                      │
│     ├── createRoteiroVSL()                           │
│     ├── createCopyPaginaVendas()                     │
│     └── createSequenciaEmails()                      │
│                                                      │
│  4. Funções de criação XLSX (Excel)                  │
│     ├── createControleFinanceiro()  → 4 abas         │
│     ├── createPlanejamentoSemanal() → 1 aba          │
│     └── createTrackerOKR()          → 4 abas         │
│                                                      │
│  5. main() → Executa tudo em sequência               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Fluxo de Execução

```
npm install          → Instala docx + exceljs
node gerar_documentos.mjs → Gera todos os 9 documentos
```

```
Execução:
  ├── 📄 Word (.docx) ──────── 3 documentos ~2s
  ├── 📊 Excel (.xlsx) ─────── 3 planilhas ~1s
  └── 📣 Marketing (.docx) ── 3 documentos ~2s
  Total: ~5 segundos
```

---

## 5. Especificações Técnicas dos Templates Excel

### Formatação Comum a Todos

| Elemento | Especificação |
|----------|---------------|
| **Header** | Fundo `#1B4332` (verde escuro), texto branco, bold, centralizado, altura 30px |
| **Linhas alternadas** | Ímpar: `#D8F3DC` (verde claro), Par: `#FFFFFF` (branco) |
| **Fonte** | Arial, tamanho 10-11 |
| **Bordas** | Finas, cor `#E5E7EB` (cinza claro) |
| **Título** | Merge de colunas, fundo `#D8F3DC`, fonte 14pt bold verde |
| **Altura de linha** | Header: 30px, Dados: 22px, Título: 35px |

### 01 — Controle Financeiro Mensal

```
Aba "Receitas":
  Colunas: Data | Descrição | Categoria | Valor (R$)
  Fórmula: =SUM(D3:D10) na linha total
  Formato: #,##0.00

Aba "Despesas":
  Colunas: Data | Descrição | Categoria | Valor (R$) | Forma de Pagamento
  Fórmula: =SUM(D3:D10) na linha total
  Formato: #,##0.00

Aba "Resumo Mensal":
  Colunas: Mês | Total Receitas | Total Despesas | Saldo
  Fórmula: =B{row}-C{row} para calcular saldo
  12 meses pré-configurados (Jan-Dez)

Aba "Metas de Economia":
  Colunas: # | Descrição | Objetivo | Valor Alvo (R$) | Status
  5 linhas com exemplos
```

### 02 — Planejamento Semanal

```
Aba "Planejamento Semanal":
  Colunas: Dia da Semana | Horário | Tarefa | Prioridade | Status | Observações

  Validação de dados (dropdowns):
    Prioridade: "Alta, Média, Baixa"
    Status: "Pendente, Em andamento, Concluído"

  Cores condicionais de prioridade:
    Alta  → Vermelho (#DC2626)
    Média → Dourado (#D4A843)
    Baixa → Verde (#40916C)

  Cores condicionais de status:
    Pendente     → Vermelho (#DC2626)
    Em andamento → Azul (#2563EB)
```

### 03 — Tracker de Metas e OKRs

```
Aba "Metas Trimestrais":
  Colunas: Título | Data Início | Prazo | Objetivos | Tarefas | Resultado | % Progresso
  Formato progresso: 0%

Aba "Metas Pessoais":
  Colunas: Nome | Metas Trimestrais | Tarefas | Resultado | % Progresso
  Exemplo: João Gabriel

Aba "Metas Profissionais":
  Colunas: Nome | Metas Trimestrais | Tarefas | Resultado | % Progresso
  Exemplo: Maria Ana

Aba "Revisão Mensal":
  Colunas: Data de Revisão | Objetivos | Progresso | Status
  Dropdown status: "No prazo, Atrasado, Concluído, Cancelado"
  12 linhas (uma por mês)
```

---

## 6. Especificações Técnicas dos Templates Word

### Formatação Comum a Todos

| Elemento | Especificação |
|----------|---------------|
| **Header** | "POUPE \| Documento Profissional" com borda inferior verde |
| **Footer** | "© 2026 POUPE • Todos os direitos reservados • Página X" centralizado |
| **Título** | UPPERCASE, 36pt, bold, cor `#1B4332`, centralizado |
| **Subtítulo** | 26pt, bold, cor `#2D6A4F`, borda inferior verde |
| **Subheading** | 22pt, bold, cor `#40916C` |
| **Corpo** | 20pt (10pt real), cor `#111827`, fonte Arial |
| **Bullets** | Círculo verde `●` + texto indentado |
| **Campos** | Label bold verde + placeholder em itálico cinza |
| **Tabelas** | Header verde escuro texto branco, linhas alternadas verde claro/branco |
| **Separadores** | Borda inferior muito sutil `#D8F3DC` |

### 01 — Proposta Comercial

```
Seções:
  1. Informações Gerais (3 campos editáveis)
  2. Resumo Executivo (parágrafo)
  3. Escopo do Projeto (campo + 3 bullets + campo)
  4. Cronograma (tabela 2 colunas, 5 linhas)
  5. Investimento (tabela 3 colunas, 2 linhas)
  6. Condições de Pagamento (3 campos)
  7. Validade da Proposta (2 bullets legais)
  8. Assinaturas (2 blocos com linha + data)
```

### 02 — Contrato de Prestação de Serviços

```
Seções:
  1. Partes do Contrato
     ├── Contratante (4 campos)
     └── Contratado (4 campos)
  2. Objeto do Contrato (parágrafo)
  3. Obrigações do Contratante (3 bullets)
  4. Obrigações do Contratado (3 bullets)
  5. Prazo (parágrafo com campos)
  6. Valor (parágrafo + 2 bullets parcelas)
  7. Forma de Pagamento (1 bullet)
  8. Confidencialidade (parágrafo jurídico)
  9. Rescisão (parágrafo com campo)
  10. Foro (parágrafo)
  11. Assinaturas e Testemunhas (4 blocos)
```

### 03 — Briefing de Projeto

```
Seções (11 no total):
  I.   Informações do Cliente (4 campos)
  II.  Objetivo do Projeto (2 campos)
  III. Público-Alvo (3 campos)
  IV.  Tom de Voz (2 campos)
  V.   Referências Visuais (tabela 2 colunas, 3 linhas)
  VI.  Entregáveis (3 campos)
  VII. Prazos (2 campos)
  VIII.Orçamento Disponível (tabela 3 colunas, 2 linhas)
  IX.  Concorrentes (3 campos)
  X.   Diferenciais (tabela 2 colunas, 2 linhas)
  XI.  Observações Adicionais (3 campos)
```

---

## 7. Especificações Técnicas dos Templates Marketing

### 01 — Roteiro de VSL

```
Estrutura cronológica do vídeo:
  1. Gancho de Abertura (0-30s)     → 2 textos: mensagem + diferenciação
  2. Identificação do Problema (1-2min) → problema + consequências
  3. Agitação da Dor (2-3min)       → dor + consequências reais
  4. Apresentação da Solução (3-4min) → solução + 3 benefícios
  5. Prova Social (4-5min)          → instrução para testemunhos
  6. Demonstração de Benefícios (5-6min) → 3 bullets detalhados
  7. Oferta Irresistível (7-10min)  → preços + bônus + garantia
  8. CTA (Call to Action)           → frase de ação
  9. Urgência / Escassez            → frase de urgência
```

### 02 — Copy para Página de Vendas

```
Estrutura de landing page:
  1. Headline Principal              → campo de título
  2. Sub-headline                    → desafio + problema
  3. Dor / Problema                  → texto descritivo
  4. Apresentação da Solução         → 3 benefícios + 3 características
  5. Lista Detalhada de Benefícios   → tabela 3 colunas, 3 linhas
  6. Oferta com Preço                → preço original + desconto + bônus
  7. Garantia                        → campo descritivo
  8. FAQ                             → tabela 2 colunas, 3 linhas
  9. CTA Final                       → botão de ação
```

### 03 — Sequência de 5 Emails

```
Funil de emails de lançamento:
  Email 1: Aquecimento       → gerar curiosidade
  Email 2: Conteúdo de Valor → entregar valor gratuito
  Email 3: Prova Social      → mostrar resultados de outros
  Email 4: Abertura de Carrinho → revelar oferta
  Email 5: Último Dia        → urgência e escassez

Cada email contém:
  - Assunto (editável)
  - Preview Text (editável)
  - Corpo do Email (editável)
  - CTA com link
```

---

## 8. Sistema de Design (Identidade Visual)

### Paleta de Cores POUPE

```
┌──────────────────────────────────────────────────┐
│  PALETA DE CORES POUPE                           │
├──────────────────────────────────────────────────┤
│                                                   │
│  ██████  #1B4332  →  primary    (verde escuro)   │
│  ██████  #2D6A4F  →  secondary  (verde médio)    │
│  ██████  #40916C  →  accent     (verde claro)    │
│  ██████  #95D5B2  →  light      (verde suave)    │
│  ██████  #D8F3DC  →  veryLight  (verde pastel)   │
│  ██████  #FFFFFF  →  white                        │
│  ██████  #1A1A1A  →  black                        │
│  ██████  #6B7280  →  gray       (texto sec.)     │
│  ██████  #F3F4F6  →  lightGray                   │
│  ██████  #D4A843  →  gold       (destaque)       │
│  ██████  #111827  →  darkText   (texto principal) │
│                                                   │
└──────────────────────────────────────────────────┘
```

### Uso das Cores

| Contexto | Cor | Hex |
|----------|-----|-----|
| Header de tabela (Excel/Word) | primary | `#1B4332` |
| Texto do header | white | `#FFFFFF` |
| Linhas alternadas (ímpar) | veryLight | `#D8F3DC` |
| Linhas alternadas (par) | white | `#FFFFFF` |
| Títulos de documento | primary | `#1B4332` |
| Subtítulos | secondary | `#2D6A4F` |
| Subheadings | accent | `#40916C` |
| Texto principal | darkText | `#111827` |
| Texto secundário/placeholder | gray | `#6B7280` |
| Bullet points | accent | `#40916C` |
| Labels de campo | secondary | `#2D6A4F` |
| Bordas de tabela | light | `#95D5B2` |
| Aba de destaque (Excel) | gold | `#D4A843` |

### Tipografia

| Elemento | Fonte | Tamanho | Peso |
|----------|-------|---------|------|
| Título | Arial | 36pt (18pt real) | Bold |
| Subtítulo | Arial | 26pt (13pt real) | Bold |
| Subheading | Arial | 22pt (11pt real) | Bold |
| Corpo | Arial | 20pt (10pt real) | Regular |
| Header/Footer | Arial | 16-20pt | Regular |
| Tabela header | Arial | 18pt (9pt real) | Bold |
| Tabela corpo | Arial | 18pt (9pt real) | Regular |
| Excel header | Arial | 11pt | Bold |
| Excel corpo | Arial | 10pt | Regular |

> **Nota:** O `docx` usa half-points, então 20pt = 10pt real no Word.

---

## 9. Repositório GitHub

### Informações

| Campo | Valor |
|-------|-------|
| **URL** | https://github.com/MagalhaDev/poupe.txt |
| **Visibilidade** | Pública |
| **Branch principal** | `main` |
| **Commit inicial** | `🚀 Initial commit — POUPE Templates Profissionais` |
| **Arquivos no commit** | 25 arquivos |
| **Git user.name** | MagalhaDev |
| **Git user.email** | magalhadev@users.noreply.github.com |

### Status Atual

- ✅ Repositório criado no GitHub
- ✅ Git inicializado localmente
- ✅ Commit feito com todos os arquivos
- ⏳ **Push pendente** — requer autenticação com Personal Access Token (PAT)

### Como Fazer o Push

```bash
# Gerar token em: https://github.com/settings/tokens/new
# Marcar permissão "repo"

# Opção 1: Push com token inline
git push -u origin main
# Quando pedir username: magalhadev
# Quando pedir password: COLE_SEU_TOKEN_AQUI

# Opção 2: Configurar credencial permanente
git remote set-url origin https://SEU_TOKEN@github.com/MagalhaDev/poupe.txt.git
git push -u origin main
```

---

## 10. Como Usar os Documentos

### Planilhas Excel (.xlsx)

1. **Abra** o arquivo com Excel, Numbers ou Google Sheets
2. **Preencha** as células vazias com seus dados
3. **As fórmulas calculam automaticamente** (totais, saldo, etc.)
4. **Use os dropdowns** para selecionar status e prioridade
5. **Adicione novas linhas** conforme necessário — copie a formatação da linha anterior

### Documentos Word (.docx)

1. **Abra** o arquivo com Word, Pages ou Google Docs
2. **Busque por `[CAMPO]`** ou textos entre colchetes `[...]`
3. **Substitua** pelos seus dados reais
4. **Mantenha a formatação** — os estilos já estão aplicados
5. **Imprima ou exporte como PDF** quando finalizar

### Templates Marketing (.docx)

1. **Abra** e leia a estrutura completa primeiro
2. **Adapte** o conteúdo para seu produto/serviço específico
3. **Substitua** todos os placeholders `[PRODUTO]`, `[BENEFÍCIO]`, etc.
4. **Ajuste o tom** para combinar com a voz da sua marca

---

## 11. Como Regenerar os Documentos

Se precisar regenerar todos os documentos (após editar os `.md` ou o script):

```bash
# 1. Instalar dependências (apenas na primeira vez)
npm install

# 2. Executar o gerador
node gerar_documentos.mjs
```

**Saída esperada:**
```
╔══════════════════════════════════════════════════╗
║  🚀 POUPE — Gerador de Documentos Profissionais ║
╚══════════════════════════════════════════════════╝

📄 Gerando documentos Word (.docx)...
  ✅ DOCX criado: templates/word/01_proposta_comercial.docx
  ✅ DOCX criado: templates/word/02_contrato_prestacao_servicos.docx
  ✅ DOCX criado: templates/word/03_briefing_projeto.docx

📊 Gerando planilhas Excel (.xlsx)...
  ✅ XLSX criado: templates/excel/01_controle_financeiro_mensal.xlsx
  ✅ XLSX criado: templates/excel/02_planejamento_semanal.xlsx
  ✅ XLSX criado: templates/excel/03_tracker_metas_okr.xlsx

📣 Gerando documentos Marketing (.docx)...
  ✅ DOCX criado: templates/marketing/01_roteiro_vsl.docx
  ✅ DOCX criado: templates/marketing/02_copy_pagina_vendas.docx
  ✅ DOCX criado: templates/marketing/03_sequencia_emails_lancamento.docx

╔══════════════════════════════════════════════════╗
║  ✅ TODOS OS 9 DOCUMENTOS GERADOS COM SUCESSO!  ║
╚══════════════════════════════════════════════════╝
```

### Para adicionar novos templates

1. Crie um novo arquivo `.md` na pasta correspondente
2. Adicione uma nova função `async function createNomeDoTemplate()` no `gerar_documentos.mjs`
3. Chame a função no `main()`
4. Execute `node gerar_documentos.mjs`

---

## 12. Roadmap Futuro

### v2.0 — App Desktop (Electron)
> Detalhado na documentação v1 (`documentacao`)

- [ ] Electron shell com sidebar e navegação
- [ ] Editor de texto embutido (ContentEditable)
- [ ] Sistema de busca fuzzy
- [ ] Favoritos com localStorage
- [ ] Exportação .txt e .pdf
- [ ] Build .dmg (macOS) + .exe (Windows)

### v2.1 — Expansão de Templates
- [ ] Expandir para 50+ templates
- [ ] Geração via IA (Ollama local)
- [ ] Templates de Contratos (NDA, Parceria, Sociedade)
- [ ] Templates de RH (Job Description, Avaliação, Onboarding)

### v3.0 — SaaS
- [ ] Migração para web app
- [ ] Login e planos de assinatura
- [ ] Biblioteca colaborativa de templates
- [ ] Editor colaborativo em tempo real
- [ ] Integração com Google Drive / OneDrive

---

## 📊 Métricas do Projeto

| Métrica | Valor |
|---------|-------|
| **Total de arquivos** | 25 (no commit) |
| **Tamanho dos .docx** | ~12KB cada |
| **Tamanho dos .xlsx** | 7.8-10KB cada |
| **Script de geração** | ~45KB (~600 linhas) |
| **Dependências** | 2 (`docx`, `exceljs`) |
| **node_modules** | 108 pacotes |
| **Tempo de geração** | ~5 segundos |
| **Tempo de execução total** | ~20 minutos (pesquisa + código + geração) |

---

> **Documentação gerada com ❤️ para o projeto POUPE**
> **Autor:** MagalhaDev
> **Data:** 27 de março de 2026
> **Versão:** 2.0
