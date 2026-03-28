---
type: xlsx
nicho: Financeiro
title: Controle de Contas a Pagar e Receber
sheets:
  - name: Contas a Receber
    columns: [Data, Cliente, Descrição, Valor (R$), Vencimento, Status]
  - name: Contas a Pagar
    columns: [Data, Fornecedor, Descrição, Valor (R$), Vencimento, Status]
---

# CONTROLE DE CONTAS A PAGAR E RECEBER

## Aba: Contas a Receber
| Data | Cliente | Descrição | Valor (R$) | Vencimento | Status |
|------|---------|-----------|------------|------------|--------|
| 01/01/2026 | Cliente A | Projeto Web | 5000 | 10/01/2026 | Pago |
| 05/01/2026 | Cliente B | Manutenção | 500 | 15/01/2026 | Pendente |
| 10/01/2026 | Cliente C | Branding | 3000 | 20/01/2026 | Pendente |
| **TOTAL** | | | **[SUM: D]** | | |

## Aba: Contas a Pagar
| Data | Fornecedor | Descrição | Valor (R$) | Vencimento | Status |
|------|------------|-----------|------------|------------|--------|
| 02/01/2026 | Imobiliária | Aluguel | 2000 | 05/01/2026 | Pago |
| 05/01/2026 | Internet | Mensalidade | 150 | 10/01/2026 | Pago |
| 12/01/2026 | AWS | Servidores | 300 | 20/01/2026 | Pendente |
| **TOTAL** | | | **[SUM: D]** | | |

---

> [!TIP]
> **Como usar:** Registre todas as entradas (Receber) e saídas (Pagar) previstas. O campo **Status** ajuda a identificar o que já foi liquidado e o que ainda está pendente de fluxo.
