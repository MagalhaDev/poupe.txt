#!/bin/bash
# POUPE.TXT — Gerador de Templates com 3 Agentes IA (Ollama)
# Cada agente gera 3 documentos base

OLLAMA_URL="http://localhost:11434/api/generate"
MODEL="llama3.2:1b"
BASE_DIR="/Users/magalha/Desktop/POUPE.TXT/templates"

generate() {
  local file="$1"
  local system="$2"
  local prompt="$3"
  local label="$4"

  echo "🤖 Gerando: $label..."

  response=$(curl -s "$OLLAMA_URL" \
    -d "{
      \"model\": \"$MODEL\",
      \"system\": \"$system\",
      \"prompt\": \"$prompt\",
      \"stream\": false,
      \"options\": {\"temperature\": 0.7, \"num_predict\": 2000}
    }" 2>/dev/null)

  # Extract just the response text
  echo "$response" | node -e "
let input = '';
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    console.log(data.response || 'ERRO: sem resposta');
  } catch(e) {
    console.log('ERRO: falha ao parsear resposta');
  }
});
" > "$file"

  echo "✅ Salvo: $file"
  echo ""
}

echo "================================================"
echo "  POUPE.TXT — Gerador de Templates com IA"
echo "  3 Agentes × 3 Docs = 9 Templates"
echo "================================================"
echo ""

# =============================================
# AGENTE 1: WORD (Documentos)
# =============================================
WORD_SYSTEM="Você é um agente especialista em criar templates de documentos profissionais. Responda APENAS com o conteúdo do template, formatado em Markdown. Seja direto, prático e profissional. Todos os templates devem estar em português do Brasil. Use formatação clara com títulos, subtítulos, campos para preencher marcados com [CAMPO], e instruções entre parênteses quando necessário."

echo "📄 AGENTE WORD — Gerando documentos..."
echo "----------------------------------------"

generate "$BASE_DIR/word/01_proposta_comercial.md" \
  "$WORD_SYSTEM" \
  "Crie um template completo de PROPOSTA COMERCIAL profissional. Inclua: capa com dados da empresa, resumo executivo, escopo do projeto, cronograma, investimento (tabela de preços), condições de pagamento, validade da proposta, e espaço para assinaturas. Use campos [NOME_EMPRESA], [NOME_CLIENTE], [VALOR], etc." \
  "Agente Word → Proposta Comercial"

generate "$BASE_DIR/word/02_contrato_prestacao_servicos.md" \
  "$WORD_SYSTEM" \
  "Crie um template completo de CONTRATO DE PRESTAÇÃO DE SERVIÇOS. Inclua: identificação das partes (contratante e contratado), objeto do contrato, obrigações de cada parte, prazo, valor e forma de pagamento, confidencialidade, rescisão, foro, e espaço para assinaturas e testemunhas. Use campos com [CAMPO] para preenchimento." \
  "Agente Word → Contrato de Serviços"

generate "$BASE_DIR/word/03_briefing_projeto.md" \
  "$WORD_SYSTEM" \
  "Crie um template completo de BRIEFING DE PROJETO. Inclua: dados do cliente, objetivo do projeto, público-alvo, tom de voz, referências visuais, entregáveis, prazos, orçamento disponível, concorrentes, diferenciais, e observações adicionais. Formato de formulário com campos para preencher." \
  "Agente Word → Briefing de Projeto"

# =============================================
# AGENTE 2: EXCEL (Planilhas)
# =============================================
EXCEL_SYSTEM="Você é um agente especialista em criar templates de planilhas e tabelas para organização e controle. Responda APENAS com o conteúdo do template em formato de tabela Markdown. Inclua cabeçalhos claros, exemplos de preenchimento nas primeiras linhas, e instruções de uso no topo. Todos os templates devem estar em português do Brasil. Use tabelas Markdown formatadas corretamente."

echo "📊 AGENTE EXCEL — Gerando planilhas..."
echo "----------------------------------------"

generate "$BASE_DIR/excel/01_controle_financeiro_mensal.md" \
  "$EXCEL_SYSTEM" \
  "Crie um template completo de CONTROLE FINANCEIRO MENSAL PESSOAL. Inclua: tabela de receitas (data, descrição, categoria, valor), tabela de despesas (data, descrição, categoria, valor, forma de pagamento), resumo mensal (total receitas, total despesas, saldo), e tabela de metas de economia. Adicione 3-4 linhas de exemplo preenchidas em cada tabela." \
  "Agente Excel → Controle Financeiro"

generate "$BASE_DIR/excel/02_planejamento_semanal.md" \
  "$EXCEL_SYSTEM" \
  "Crie um template completo de PLANEJAMENTO SEMANAL com tabela para cada dia da semana (segunda a domingo). Colunas: Horário, Tarefa, Prioridade (Alta/Média/Baixa), Status (Pendente/Em andamento/Concluído), Observações. Inclua blocos de manhã, tarde e noite. Adicione exemplos de preenchimento." \
  "Agente Excel → Planejamento Semanal"

generate "$BASE_DIR/excel/03_tracker_metas_okr.md" \
  "$EXCEL_SYSTEM" \
  "Crie um template de TRACKER DE METAS E OKRs (Objectives and Key Results). Inclua: tabela de objetivos trimestrais, resultados-chave com métricas, progresso percentual, responsável, prazo, e status. Adicione uma seção de revisão mensal. Preencha com exemplos realistas de metas pessoais e profissionais." \
  "Agente Excel → Tracker de Metas OKR"

# =============================================
# AGENTE 3: MARKETING (Copy & Roteiros)
# =============================================
MARKETING_SYSTEM="Você é um agente especialista em copywriting e marketing digital. Responda APENAS com o conteúdo do template, formatado em Markdown. Seja persuasivo, direto e orientado a conversão. Todos os templates devem estar em português do Brasil. Use frameworks comprovados de copy (AIDA, PAS, etc). Marque campos editáveis com [CAMPO]."

echo "📢 AGENTE MARKETING — Gerando copies e roteiros..."
echo "----------------------------------------"

generate "$BASE_DIR/marketing/01_roteiro_vsl.md" \
  "$MARKETING_SYSTEM" \
  "Crie um template completo de ROTEIRO DE VSL (Video Sales Letter) de 5-10 minutos. Estrutura: Gancho de abertura (primeiros 30s), Identificação do problema, Agitação da dor, Apresentação da solução, Prova social, Demonstração de benefícios, Oferta irresistível, Bônus, Garantia, CTA (Call to Action), Urgência/Escassez. Use [PRODUTO], [BENEFÍCIO], [PREÇO], etc como campos editáveis." \
  "Agente Marketing → Roteiro VSL"

generate "$BASE_DIR/marketing/02_copy_pagina_vendas.md" \
  "$MARKETING_SYSTEM" \
  "Crie um template completo de COPY PARA PÁGINA DE VENDAS. Inclua todas as seções: headline principal, sub-headline, seção de dor/problema, apresentação da solução, lista de benefícios (bullet points), prova social (depoimentos modelo), seção de oferta com preço, bônus, garantia, FAQ, e CTA final. Use framework AIDA. Campos editáveis com [CAMPO]." \
  "Agente Marketing → Copy Página de Vendas"

generate "$BASE_DIR/marketing/03_sequencia_emails_lancamento.md" \
  "$MARKETING_SYSTEM" \
  "Crie um template de SEQUÊNCIA DE 5 EMAILS DE LANÇAMENTO. Email 1: Aquecimento (gerar curiosidade). Email 2: Conteúdo de valor (ensinar algo). Email 3: Prova social (cases e depoimentos). Email 4: Abertura de carrinho (oferta). Email 5: Último dia (urgência e escassez). Para cada email inclua: assunto, preview text, corpo do email, e CTA. Use campos editáveis." \
  "Agente Marketing → Sequência de Emails"

echo ""
echo "================================================"
echo "  ✅ CONCLUÍDO! 9 templates gerados com sucesso"
echo "================================================"
echo ""
echo "📁 Pasta: $BASE_DIR"
echo ""
echo "  📄 word/"
echo "     ├── 01_proposta_comercial.md"
echo "     ├── 02_contrato_prestacao_servicos.md"
echo "     └── 03_briefing_projeto.md"
echo ""
echo "  📊 excel/"
echo "     ├── 01_controle_financeiro_mensal.md"
echo "     ├── 02_planejamento_semanal.md"
echo "     └── 03_tracker_metas_okr.md"
echo ""
echo "  📢 marketing/"
echo "     ├── 01_roteiro_vsl.md"
echo "     ├── 02_copy_pagina_vendas.md"
echo "     └── 03_sequencia_emails_lancamento.md"
echo ""
echo "Abra os arquivos para revisar!"
