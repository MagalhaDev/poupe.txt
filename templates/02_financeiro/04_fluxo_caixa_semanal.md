---
type: xlsx
nicho: Financeiro
title: Fluxo de Caixa Semanal
sheets:
  - name: Fluxo de Caixa
    columns: [Dia, Descrição, Categoria, Entradas (R$), Saídas (R$), Saldo Diário, Acumulado]
---

# FLUXO DE CAIXA SEMANAL

## Aba: Fluxo de Caixa
| Dia | Descrição | Categoria | Entradas (R$) | Saídas (R$) | Saldo Diário | Acumulado |
|-----|-----------|-----------|---------------|-------------|--------------|-----------|
| Segunda | Saldo Inicial | [SALDO] | 2000 | 0 | 2000 | 2000 |
| Terça | Recebimento Cliente X | Vendas | 1500 | 0 | 1500 | 3500 |
| Quarta | Pagamento Fornecedor Y | Insumos | 0 | 500 | -500 | 3000 |
| Quinta | Serviços Prestados Z | Serviços | 800 | 0 | 800 | 3800 |
| Sexta | Pagamento Internet | Mensal | 0 | 150 | -150 | 3650 |
| Sábado | Outros | Diversos | 0 | 0 | 0 | 3650 |
| **TOTAL** | | | **[SUM: D]** | **[SUM: E]** | **[SUM: F]** | **[LAST: G]** |

---

> [!TIP]
> **Como usar:** Preencha as entradas e saídas diárias. O **Saldo Diário** é calculado pela diferença entre Entradas e Saídas (D - E). O **Acumulado** é o saldo do dia anterior somado ao saldo do dia atual.
