# 💰 POUPE — Templates Profissionais

Sistema completo de templates profissionais para gestão financeira, comercial e marketing.

## 📁 Estrutura

```
templates/
├── excel/          → Planilhas .xlsx com fórmulas e validação
│   ├── 01_controle_financeiro_mensal.xlsx
│   ├── 02_planejamento_semanal.xlsx
│   └── 03_tracker_metas_okr.xlsx
├── word/           → Documentos .docx formatados
│   ├── 01_proposta_comercial.docx
│   ├── 02_contrato_prestacao_servicos.docx
│   └── 03_briefing_projeto.docx
└── marketing/      → Templates de marketing .docx
    ├── 01_roteiro_vsl.docx
    ├── 02_copy_pagina_vendas.docx
    └── 03_sequencia_emails_lancamento.docx
```

## 🚀 Como Usar

### Documentos Word (.docx)
Abra no Word, Pages ou Google Docs. Substitua os campos `[CAMPO]` pelas suas informações.

### Planilhas Excel (.xlsx)
Abra no Excel, Numbers ou Google Sheets. As planilhas já contêm **fórmulas funcionais** e **validação de dados** (dropdowns).

### Templates de Marketing (.docx)
Roteiros e copies prontos para personalizar com seu produto/serviço.

## 🔄 Regenerar Templates

Para regenerar os documentos a partir dos markdowns:

```bash
npm install
node gerar_documentos.mjs
```

## 📋 Templates Disponíveis

| Categoria | Template | Formato |
|-----------|----------|---------|
| 📊 Excel | Controle Financeiro Mensal | `.xlsx` |
| 📊 Excel | Planejamento Semanal | `.xlsx` |
| 📊 Excel | Tracker de Metas e OKRs | `.xlsx` |
| 📄 Word | Proposta Comercial | `.docx` |
| 📄 Word | Contrato de Prestação de Serviços | `.docx` |
| 📄 Word | Briefing de Projeto | `.docx` |
| 📣 Marketing | Roteiro de VSL | `.docx` |
| 📣 Marketing | Copy para Página de Vendas | `.docx` |
| 📣 Marketing | Sequência de 5 Emails de Lançamento | `.docx` |

## 🎨 Design

Todos os documentos seguem a identidade visual **POUPE**:
- Paleta de cores verde profissional
- Formatação corporativa com header/footer
- Campos editáveis claramente marcados

---

**© 2026 POUPE** — Todos os direitos reservados.
