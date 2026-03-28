import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, HeadingLevel, Header, Footer, PageNumber, ShadingType } from 'docx';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

// ============================================================
// CORES E ESTILOS DO POUPE
// ============================================================
const COLORS = {
  primary: '1B4332',      // verde escuro
  secondary: '2D6A4F',    // verde médio
  accent: '40916C',       // verde claro
  light: '95D5B2',        // verde suave
  veryLight: 'D8F3DC',    // verde muito claro
  white: 'FFFFFF',
  black: '1A1A1A',
  gray: '6B7280',
  lightGray: 'F3F4F6',
  gold: 'D4A843',
  darkText: '111827',
};

// ============================================================
// FUNÇÕES DE CRIAÇÃO DE DOCX
// ============================================================

function createHeader() {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: 'POUPE', bold: true, size: 20, color: COLORS.primary, font: 'Arial' }),
          new TextRun({ text: '  |  Documento Profissional', size: 16, color: COLORS.gray, font: 'Arial' }),
        ],
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.light } },
        spacing: { after: 200 },
      }),
    ],
  });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: '© 2026 POUPE  •  Todos os direitos reservados  •  Página ', size: 14, color: COLORS.gray, font: 'Arial' }),
          new TextRun({ children: [PageNumber.CURRENT], size: 14, color: COLORS.gray, font: 'Arial' }),
        ],
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.light } },
        spacing: { before: 200 },
      }),
    ],
  });
}

function titleParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 36, color: COLORS.primary, font: 'Arial' }),
    ],
    spacing: { before: 400, after: 200 },
    alignment: AlignmentType.CENTER,
  });
}

function subtitleParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({ text, bold: true, size: 26, color: COLORS.secondary, font: 'Arial' }),
    ],
    spacing: { before: 300, after: 150 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.accent } },
  });
}

function subheadingParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({ text, bold: true, size: 22, color: COLORS.accent, font: 'Arial' }),
    ],
    spacing: { before: 200, after: 100 },
  });
}

function bodyParagraph(text, opts = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        color: opts.color || COLORS.darkText,
        font: 'Arial',
        bold: opts.bold || false,
        italics: opts.italics || false,
      }),
    ],
    spacing: { before: 80, after: 80 },
    indent: opts.indent ? { left: 400 } : undefined,
  });
}

function bulletParagraph(text) {
  return new Paragraph({
    children: [
      new TextRun({ text: '●  ', bold: true, size: 20, color: COLORS.accent, font: 'Arial' }),
      new TextRun({ text, size: 20, color: COLORS.darkText, font: 'Arial' }),
    ],
    spacing: { before: 60, after: 60 },
    indent: { left: 400 },
  });
}

function separatorParagraph() {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 8 })],
    spacing: { before: 100, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.veryLight } },
  });
}

function fieldParagraph(label, placeholder) {
  return new Paragraph({
    children: [
      new TextRun({ text: label + ': ', bold: true, size: 20, color: COLORS.secondary, font: 'Arial' }),
      new TextRun({ text: placeholder || '________________________________', size: 20, color: COLORS.gray, font: 'Arial', italics: true }),
    ],
    spacing: { before: 80, after: 80 },
    indent: { left: 400 },
  });
}

function createDocxTable(headers, rows) {
  const borderStyle = { style: BorderStyle.SINGLE, size: 1, color: COLORS.light };
  const borders = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

  const headerRow = new TableRow({
    children: headers.map(h => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, size: 18, color: COLORS.white, font: 'Arial' })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 60 },
      })],
      shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
      borders,
      width: { size: Math.floor(9000 / headers.length), type: WidthType.DXA },
    })),
    tableHeader: true,
  });

  const dataRows = rows.map((row, idx) => new TableRow({
    children: row.map(cell => new TableCell({
      children: [new Paragraph({
        children: [new TextRun({ text: cell, size: 18, color: COLORS.darkText, font: 'Arial' })],
        spacing: { before: 40, after: 40 },
      })],
      shading: { fill: idx % 2 === 0 ? COLORS.veryLight : COLORS.white, type: ShadingType.CLEAR },
      borders,
      width: { size: Math.floor(9000 / headers.length), type: WidthType.DXA },
    })),
  }));

  return new Table({
    rows: [headerRow, ...dataRows],
    width: { size: 9000, type: WidthType.DXA },
  });
}

async function saveDocx(doc, filePath) {
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
  console.log(`  ✅ DOCX criado: ${filePath}`);
}

// ============================================================
// WORD TEMPLATES
// ============================================================

async function createPropostaComercial() {
  const doc = new Document({
    sections: [{
      headers: { default: createHeader() },
      footers: { default: createFooter() },
      children: [
        titleParagraph('Proposta Comercial'),
        separatorParagraph(),

        subtitleParagraph('Informações Gerais'),
        fieldParagraph('Nome da Empresa', '[NOME_EMPRESA]'),
        fieldParagraph('Nome do Cliente', '[NOME_CLIENTE]'),
        fieldParagraph('Data de Entrega', '[DATA_DE_ENTREGA]'),
        separatorParagraph(),

        subtitleParagraph('Resumo Executivo'),
        bodyParagraph('A [NOME_EMPRESA] está comprometida em fornecer produtos e serviços de alta qualidade que atendam às necessidades específicas dos clientes. Com foco exclusivo na excelência, investimos todos os nossos recursos para garantir o sucesso do projeto.'),
        separatorParagraph(),

        subtitleParagraph('Escopo do Projeto'),
        fieldParagraph('Objetivo', '[DESCRIÇÃO DO OBJETIVO]'),
        bodyParagraph('Tarefas Principais:', { bold: true }),
        bulletParagraph('[TAREFA 1]'),
        bulletParagraph('[TAREFA 2]'),
        bulletParagraph('[TAREFA 3]'),
        fieldParagraph('Tempo Estimado', '[TEMPO_ESTIMADO]'),
        separatorParagraph(),

        subtitleParagraph('Cronograma'),
        createDocxTable(
          ['Data', 'Atividade'],
          [
            ['[DD/MM/AAAA]', 'Reunião de Análise de Mercado'],
            ['[DD/MM/AAAA]', 'Reunião de Plano de Conteúdo'],
            ['[DD/MM/AAAA]', 'Criação do Site'],
            ['[DD/MM/AAAA]', 'Lançamento do Projeto'],
            ['[DD/MM/AAAA]', 'Reunião de Progresso'],
          ]
        ),
        separatorParagraph(),

        subtitleParagraph('Investimento'),
        createDocxTable(
          ['Preço', 'Descrição', 'Tempo de Execução'],
          [
            ['R$ [VALOR]', '[DESCRIÇÃO]', '[TEMPO]'],
            ['R$ [VALOR]', '[DESCRIÇÃO]', '[TEMPO]'],
          ]
        ),
        separatorParagraph(),

        subtitleParagraph('Condições de Pagamento'),
        fieldParagraph('Prazo', '[PRAZO] por R$ [VALOR TOTAL]'),
        fieldParagraph('Forma de Pagamento', '[FORMA_DE_PAGAMENTO]'),
        fieldParagraph('Observações', '[OBSERVAÇÕES]'),
        separatorParagraph(),

        subtitleParagraph('Validade da Proposta'),
        bulletParagraph('Esta proposta é válida a partir do momento de sua assinatura pelo cliente.'),
        bulletParagraph('A proposta não pode ser alterada sem a concordância expressa do cliente.'),
        separatorParagraph(),

        subtitleParagraph('Assinaturas'),
        new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 400 } }),
        bodyParagraph('________________________________________'),
        bodyParagraph('[NOME_EMPRESA] - Representante Legal', { italics: true }),
        new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 300 } }),
        bodyParagraph('________________________________________'),
        bodyParagraph('[NOME_CLIENTE] - Cliente', { italics: true }),
        new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 200 } }),
        bodyParagraph('Data: ____/____/________'),
      ],
    }],
  });
  await saveDocx(doc, 'templates/word/01_proposta_comercial.docx');
}

async function createContratoPrestacao() {
  const doc = new Document({
    sections: [{
      headers: { default: createHeader() },
      footers: { default: createFooter() },
      children: [
        titleParagraph('Contrato de Prestação de Serviços'),
        separatorParagraph(),

        subtitleParagraph('Partes do Contrato'),
        subheadingParagraph('CONTRATANTE'),
        fieldParagraph('Nome', '[NOME DO CONTRATANTE]'),
        fieldParagraph('RG', '[RG]'),
        fieldParagraph('Endereço', '[ENDEREÇO]'),
        fieldParagraph('Telefone', '[TELEFONE]'),
        new Paragraph({ children: [new TextRun({ text: '', size: 10 })], spacing: { before: 100 } }),
        subheadingParagraph('CONTRATADO'),
        fieldParagraph('Nome', '[NOME DO CONTRATADO]'),
        fieldParagraph('RG', '[RG]'),
        fieldParagraph('Endereço', '[ENDEREÇO]'),
        fieldParagraph('Telefone', '[TELEFONE]'),
        separatorParagraph(),

        subtitleParagraph('Objeto do Contrato'),
        bodyParagraph('Este contrato estabelece a prestação de serviços pelo Contratante ao Contratado, incluindo [LISTA DE SERVIÇOS].'),
        separatorParagraph(),

        subtitleParagraph('Obrigações do Contratante'),
        bulletParagraph('Prestar os serviços especificados no objeto deste contrato.'),
        bulletParagraph('Realizar as atividades e tarefas contratadas com eficácia e precisão.'),
        bulletParagraph('Manter a confidencialidade em relação às informações confidenciais do Contratado.'),
        separatorParagraph(),

        subtitleParagraph('Obrigações do Contratado'),
        bulletParagraph('Aceitar o contrato por ato de vontade expressa.'),
        bulletParagraph('Proporcionar ao Contratante os serviços e informações solicitadas.'),
        bulletParagraph('Realizar as atividades em conformidade com o objeto deste contrato.'),
        separatorParagraph(),

        subtitleParagraph('Prazo'),
        bodyParagraph('O prazo para realizar as atividades contratadas é de [DATA INÍCIO] a [DATA TÉRMINO].'),
        separatorParagraph(),

        subtitleParagraph('Valor'),
        bodyParagraph('O valor total do serviço é de R$ [VALOR TOTAL]. O pagamento será feito em parcelas:'),
        bulletParagraph('1ª parcela: [DATA PAGAMENTO 1]'),
        bulletParagraph('2ª parcela: [DATA PAGAMENTO 2]'),
        separatorParagraph(),

        subtitleParagraph('Forma de Pagamento'),
        bulletParagraph('As parcelas serão pagas por transferência bancária.'),
        separatorParagraph(),

        subtitleParagraph('Confidencialidade'),
        bodyParagraph('O Contratante compromete-se a manter a confidencialidade das informações do Contratado e de terceiros. É proibido divulgar, compartilhar ou usar essas informações sem autorização prévia.'),
        separatorParagraph(),

        subtitleParagraph('Rescisão'),
        bodyParagraph('Este contrato pode ser rescindido por qualquer das partes, com antecedência de [PRAZO DE RESCISÃO], sem justificativa prévia.'),
        separatorParagraph(),

        subtitleParagraph('Foro'),
        bodyParagraph('Este contrato é sujeito ao foro da comarca onde ocorreu a contratação.'),
        separatorParagraph(),

        subtitleParagraph('Assinaturas e Testemunhas'),
        new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 400 } }),
        bodyParagraph('________________________________________'),
        bodyParagraph('CONTRATANTE - [NOME]', { italics: true }),
        bodyParagraph('Data: ____/____/________'),
        new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 300 } }),
        bodyParagraph('________________________________________'),
        bodyParagraph('CONTRATADO - [NOME]', { italics: true }),
        bodyParagraph('Data: ____/____/________'),
        new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 300 } }),
        bodyParagraph('________________________________________'),
        bodyParagraph('TESTEMUNHA 1', { italics: true }),
        bodyParagraph('Data: ____/____/________'),
        new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 200 } }),
        bodyParagraph('________________________________________'),
        bodyParagraph('TESTEMUNHA 2', { italics: true }),
        bodyParagraph('Data: ____/____/________'),
      ],
    }],
  });
  await saveDocx(doc, 'templates/word/02_contrato_prestacao_servicos.docx');
}

async function createBriefingProjeto() {
  const doc = new Document({
    sections: [{
      headers: { default: createHeader() },
      footers: { default: createFooter() },
      children: [
        titleParagraph('Briefing de Projeto'),
        separatorParagraph(),

        subtitleParagraph('I. Informações do Cliente'),
        fieldParagraph('Nome', ''),
        fieldParagraph('Endereço', ''),
        fieldParagraph('Telefone', ''),
        fieldParagraph('E-mail', ''),
        separatorParagraph(),

        subtitleParagraph('II. Objetivo do Projeto'),
        fieldParagraph('Descrição do projeto', ''),
        fieldParagraph('Objetivos específicos', ''),
        separatorParagraph(),

        subtitleParagraph('III. Público-Alvo'),
        fieldParagraph('Idade da população-alvo', ''),
        fieldParagraph('Interesses e necessidades', ''),
        fieldParagraph('Tamanho da amostra ideal', ''),
        separatorParagraph(),

        subtitleParagraph('IV. Tom de Voz'),
        fieldParagraph('Linguagem do tom de voz', ''),
        fieldParagraph('Harmonia auditiva', ''),
        separatorParagraph(),

        subtitleParagraph('V. Referências Visuais'),
        createDocxTable(
          ['Referência', 'Imagem/Link'],
          [
            ['[DESCRIÇÃO]', '[IMAGEM OU LINK]'],
            ['[DESCRIÇÃO]', '[IMAGEM OU LINK]'],
            ['[DESCRIÇÃO]', '[IMAGEM OU LINK]'],
          ]
        ),
        separatorParagraph(),

        subtitleParagraph('VI. Entregáveis'),
        fieldParagraph('Nome do documento', ''),
        fieldParagraph('Descrição do documento', ''),
        fieldParagraph('Tipo de arquivo', ''),
        separatorParagraph(),

        subtitleParagraph('VII. Prazos'),
        fieldParagraph('Data de entrega principal', ''),
        fieldParagraph('Data de entrega secundária', ''),
        separatorParagraph(),

        subtitleParagraph('VIII. Orçamento Disponível'),
        createDocxTable(
          ['Item', 'Custo Estimado', 'Descrição'],
          [
            ['[ITEM]', 'R$ [VALOR]', '[DESCRIÇÃO]'],
            ['[ITEM]', 'R$ [VALOR]', '[DESCRIÇÃO]'],
          ]
        ),
        separatorParagraph(),

        subtitleParagraph('IX. Concorrentes'),
        fieldParagraph('Concorrente 1', ''),
        fieldParagraph('Concorrente 2', ''),
        fieldParagraph('Concorrente 3', ''),
        separatorParagraph(),

        subtitleParagraph('X. Diferenciais'),
        createDocxTable(
          ['Diferencial', 'Justificativa'],
          [
            ['[DIFERENCIAL]', '[JUSTIFICATIVA]'],
            ['[DIFERENCIAL]', '[JUSTIFICATIVA]'],
          ]
        ),
        separatorParagraph(),

        subtitleParagraph('XI. Observações Adicionais'),
        fieldParagraph('Objetivos adicionais', ''),
        fieldParagraph('Compromissos adicionais', ''),
        fieldParagraph('Forma de comunicação preferida', ''),
      ],
    }],
  });
  await saveDocx(doc, 'templates/word/03_briefing_projeto.docx');
}

// ============================================================
// MARKETING TEMPLATES (DOCX)
// ============================================================

async function createRoteiroVSL() {
  const doc = new Document({
    sections: [{
      headers: { default: createHeader() },
      footers: { default: createFooter() },
      children: [
        titleParagraph('Roteiro de VSL'),
        bodyParagraph('Video Sales Letter — Roteiro completo para vídeo de vendas', { italics: true, color: COLORS.gray }),
        separatorParagraph(),

        subtitleParagraph('1. Gancho de Abertura (primeiros 30s)'),
        subheadingParagraph('Mensagem Inicial'),
        bodyParagraph('"Você já se perguntou por que suas finanças estão se deteriorando? Por que seus investimentos não estão rendendo o que você esperava?"', { indent: true }),
        subheadingParagraph('Diferenciação'),
        bodyParagraph('"Eu sei sobre isso. Eu também acredito que qualquer pessoa pode mudar seu estilo de vida e alcançar seus objetivos financeiros."', { indent: true }),
        separatorParagraph(),

        subtitleParagraph('2. Identificação do Problema (1-2 min)'),
        subheadingParagraph('Problema'),
        bodyParagraph('"Você provavelmente já se sentiu frustrado ao perceber que suas finanças estão em uma situação precária. Você não sabe como manter seu emprego e financiar seus sonhos."', { indent: true }),
        subheadingParagraph('Consequências'),
        bodyParagraph('"Além disso, você provavelmente já viu vários relatórios financeiros que mostram um declínio geral nos seus rendimentos."', { indent: true }),
        separatorParagraph(),

        subtitleParagraph('3. Agitação da Dor (2-3 min)'),
        subheadingParagraph('Dor de Mudança'),
        bodyParagraph('"A dor de não ter controle sobre suas finanças. Algo que te impede de alcançar os seus objetivos financeiros."', { indent: true }),
        subheadingParagraph('Consequências Reais'),
        bodyParagraph('"A situação pode ser tão desgastante que até mesmo você se sente desesperado para mudar."', { indent: true }),
        separatorParagraph(),

        subtitleParagraph('4. Apresentação da Solução (3-4 min)'),
        subheadingParagraph('Solução Inovadora'),
        bodyParagraph('"[PRODUTO] é uma solução personalizada que ajuda as pessoas como você a alcançar seus objetivos financeiros de forma rápida e eficaz."', { indent: true }),
        subheadingParagraph('Benefícios Práticos'),
        bulletParagraph('[BENEFÍCIO 1]'),
        bulletParagraph('[BENEFÍCIO 2]'),
        bulletParagraph('[BENEFÍCIO 3]'),
        separatorParagraph(),

        subtitleParagraph('5. Prova Social (4-5 min)'),
        bodyParagraph('Incluir testemunhos reais de clientes satisfeitos. Compartilhar exemplos concretos de transformação.', { indent: true, italics: true }),
        separatorParagraph(),

        subtitleParagraph('6. Demonstração de Benefícios (5-6 min)'),
        bulletParagraph('[BENEFÍCIO 1] — detalhar como funciona'),
        bulletParagraph('[BENEFÍCIO 2] — detalhar como funciona'),
        bulletParagraph('[BENEFÍCIO 3] — detalhar como funciona'),
        separatorParagraph(),

        subtitleParagraph('7. Oferta Irresistível (7-10 min)'),
        subheadingParagraph('Oferta Especial'),
        fieldParagraph('Preço original', 'R$ [VALOR]'),
        fieldParagraph('Preço promocional', 'R$ [VALOR]'),
        fieldParagraph('Bônus adicional', '[DESCRIÇÃO DO BÔNUS]'),
        subheadingParagraph('Garantia'),
        bodyParagraph('"Se você não se sentir satisfeito, devolveremos 100% do seu investimento."', { indent: true }),
        separatorParagraph(),

        subtitleParagraph('8. CTA (Call to Action)'),
        bodyParagraph('"Agora é hora de tomar o primeiro passo para mudar sua vida financeira."', { indent: true, bold: true }),
        bodyParagraph('Clique no link abaixo para garantir sua vaga agora!', { indent: true }),
        separatorParagraph(),

        subtitleParagraph('9. Urgência / Escassez'),
        bodyParagraph('"Não perca mais tempo. Esta oferta é por tempo limitado!"', { indent: true, bold: true }),
      ],
    }],
  });
  await saveDocx(doc, 'templates/marketing/01_roteiro_vsl.docx');
}

async function createCopyPaginaVendas() {
  const doc = new Document({
    sections: [{
      headers: { default: createHeader() },
      footers: { default: createFooter() },
      children: [
        titleParagraph('Copy para Página de Vendas'),
        bodyParagraph('Template completo para landing page de alta conversão', { italics: true, color: COLORS.gray }),
        separatorParagraph(),

        subtitleParagraph('Seção 1: Headline Principal'),
        fieldParagraph('Título do produto/serviço', '[TÍTULO]'),
        separatorParagraph(),

        subtitleParagraph('Seção 2: Sub-headline'),
        fieldParagraph('Desafio do cliente', '[DESAFIO]'),
        fieldParagraph('Problema principal', '[PROBLEMA]'),
        separatorParagraph(),

        subtitleParagraph('Seção 3: Dor / Problema'),
        bodyParagraph('[Texto que ilustra a situação do cliente e o que ele precisa fazer para resolver o problema.]', { indent: true, italics: true }),
        separatorParagraph(),

        subtitleParagraph('Seção 4: Apresentação da Solução'),
        fieldParagraph('A solução', '[DESCRIÇÃO DA SOLUÇÃO]'),
        subheadingParagraph('Benefícios Principais'),
        bulletParagraph('[Benefício 1]'),
        bulletParagraph('[Benefício 2]'),
        bulletParagraph('[Benefício 3]'),
        subheadingParagraph('Características Principais'),
        bulletParagraph('[Característica 1]'),
        bulletParagraph('[Característica 2]'),
        bulletParagraph('[Característica 3]'),
        separatorParagraph(),

        subtitleParagraph('Seção 5: Lista Detalhada de Benefícios'),
        createDocxTable(
          ['Benefício', 'Descrição', 'Por que é importante?'],
          [
            ['[Benefício 1]', '[Descrição]', '[Justificativa]'],
            ['[Benefício 2]', '[Descrição]', '[Justificativa]'],
            ['[Benefício 3]', '[Descrição]', '[Justificativa]'],
          ]
        ),
        separatorParagraph(),

        subtitleParagraph('Seção 6: Oferta com Preço'),
        fieldParagraph('Preço original', 'R$ [VALOR]'),
        fieldParagraph('Preço com desconto', 'R$ [VALOR]'),
        fieldParagraph('Duração do desconto', '[PRAZO]'),
        subheadingParagraph('Bônus'),
        bulletParagraph('[Bônus 1] — [Descrição]'),
        bulletParagraph('[Bônus 2] — [Descrição]'),
        separatorParagraph(),

        subtitleParagraph('Seção 7: Garantia'),
        fieldParagraph('Garantia de satisfação', '[DESCRIÇÃO, DURAÇÃO E CONDIÇÕES]'),
        separatorParagraph(),

        subtitleParagraph('Seção 8: FAQ'),
        createDocxTable(
          ['Pergunta', 'Resposta'],
          [
            ['[PERGUNTA 1]', '[RESPOSTA 1]'],
            ['[PERGUNTA 2]', '[RESPOSTA 2]'],
            ['[PERGUNTA 3]', '[RESPOSTA 3]'],
          ]
        ),
        separatorParagraph(),

        subtitleParagraph('Seção 9: CTA Final'),
        bodyParagraph('COMECE AGORA!', { bold: true, color: COLORS.primary }),
        bodyParagraph('[Link ou botão de ação]', { indent: true }),
      ],
    }],
  });
  await saveDocx(doc, 'templates/marketing/02_copy_pagina_vendas.docx');
}

async function createSequenciaEmails() {
  const emails = [
    { num: 1, title: 'Aquecimento', assunto: '[ASSUNTO]', preview: '"Você está prestes a aprender o segredo para [OBJETIVO]!"',
      corpo: 'Olá, [Nome]\n\nQueríamos saber se você é um(a) [INDICADOR] em [ASSUNTO]. A partir deste momento, vamos compartilhar com você conteúdo de valor sobre como alcançar seus objetivos.\n\nClique aqui: [LINK]' },
    { num: 2, title: 'Conteúdo de Valor', assunto: '[ASSUNTO]', preview: '"Encontre a solução para [PROBLEMA] com nosso [PRODUTO/SERVIÇO]."',
      corpo: 'Olá, [Nome]\n\nVocê está prestes a aprender o segredo para [OBJETIVO]!\n\nNossa equipe vai mostrar-lhe como:\n• [CONTEÚDO DE VALOR 1]\n• [CONTEÚDO DE VALOR 2]\n\nClique aqui: [LINK]' },
    { num: 3, title: 'Prova Social', assunto: 'Exemplos de Sucesso', preview: '"Vamos compartilhar exemplos de pessoas que alcançaram seus objetivos."',
      corpo: 'Olá, [Nome]\n\nQueremos que você saiba que não é fácil alcançar seus objetivos sozinho. Nossa equipe tem anos de experiência para ajudá-lo.\n\nVeja os depoimentos: [LINK]' },
    { num: 4, title: 'Abertura de Carrinho', assunto: 'Oferta Limitada', preview: '"Agora é o momento! Oferecemos uma oferta limitada para você."',
      corpo: 'Olá, [Nome]\n\nEsta é a oportunidade que você esperava! Nossa oferta limitada está disponível AGORA.\n\nGaranta sua vaga: [LINK]' },
    { num: 5, title: 'Último Dia', assunto: 'Fim da Oferta', preview: '"Não perca essa oportunidade! A oferta acaba HOJE."',
      corpo: 'Olá, [Nome]\n\nÚltima chance! As inscrições encerram HOJE à meia-noite.\n\nNão perca: [LINK]' },
  ];

  const children = [
    titleParagraph('Sequência de 5 Emails de Lançamento'),
    bodyParagraph('Template completo para campanha de email marketing', { italics: true, color: COLORS.gray }),
    separatorParagraph(),
  ];

  for (const email of emails) {
    children.push(subtitleParagraph(`Email ${email.num}: ${email.title}`));
    children.push(fieldParagraph('Assunto', email.assunto));
    children.push(fieldParagraph('Preview Text', email.preview));
    children.push(subheadingParagraph('Corpo do Email'));
    for (const line of email.corpo.split('\n')) {
      if (line.startsWith('•')) {
        children.push(bulletParagraph(line.substring(2)));
      } else {
        children.push(bodyParagraph(line, { indent: true }));
      }
    }
    children.push(separatorParagraph());
  }

  children.push(subtitleParagraph('Campos Editáveis'));
  children.push(bulletParagraph('Assunto de cada email'));
  children.push(bulletParagraph('Preview Text'));
  children.push(bulletParagraph('Corpo do Email (todos)'));
  children.push(bulletParagraph('Links e CTAs'));
  children.push(bulletParagraph('Conteúdo de Valor'));
  children.push(bodyParagraph('Personalize os emails com dados do seu público-alvo e ajuste as mensagens conforme as respostas dos seus clientes.', { italics: true, color: COLORS.gray }));

  const doc = new Document({
    sections: [{
      headers: { default: createHeader() },
      footers: { default: createFooter() },
      children,
    }],
  });
  await saveDocx(doc, 'templates/marketing/03_sequencia_emails_lancamento.docx');
}

// ============================================================
// EXCEL TEMPLATES
// ============================================================

function styleExcelHeader(ws, row, colCount) {
  for (let c = 1; c <= colCount; c++) {
    const cell = ws.getRow(row).getCell(c);
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11, name: 'Arial' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1B4332' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF95D5B2' } },
      bottom: { style: 'thin', color: { argb: 'FF95D5B2' } },
      left: { style: 'thin', color: { argb: 'FF95D5B2' } },
      right: { style: 'thin', color: { argb: 'FF95D5B2' } },
    };
  }
  ws.getRow(row).height = 30;
}

function styleExcelRow(ws, row, colCount, isAlt) {
  for (let c = 1; c <= colCount; c++) {
    const cell = ws.getRow(row).getCell(c);
    cell.font = { size: 10, name: 'Arial', color: { argb: 'FF111827' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isAlt ? 'FFD8F3DC' : 'FFFFFFFF' } };
    cell.alignment = { vertical: 'middle', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
    };
  }
  ws.getRow(row).height = 22;
}

function styleExcelTitle(ws, row, colCount, text) {
  ws.mergeCells(row, 1, row, colCount);
  const cell = ws.getRow(row).getCell(1);
  cell.value = text;
  cell.font = { bold: true, size: 14, color: { argb: 'FF1B4332' }, name: 'Arial' };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD8F3DC' } };
  ws.getRow(row).height = 35;
}

async function createControleFinanceiro() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'POUPE';
  wb.created = new Date();

  // ---- ABA RECEITAS ----
  const wsRec = wb.addWorksheet('Receitas', { properties: { tabColor: { argb: 'FF40916C' } } });
  wsRec.columns = [
    { header: '', width: 15 },
    { header: '', width: 35 },
    { header: '', width: 18 },
    { header: '', width: 18 },
  ];
  styleExcelTitle(wsRec, 1, 4, '💰 CONTROLE DE RECEITAS');
  wsRec.getRow(2).values = ['Data', 'Descrição', 'Categoria', 'Valor (R$)'];
  styleExcelHeader(wsRec, 2, 4);
  const recData = [
    ['01/02/2023', 'Salário mensal', 'Salário', 5000],
    ['05/02/2023', 'Freelance projeto X', 'Freelance', 2000],
    ['10/02/2023', 'Rendimento investimento', 'Investimentos', 350],
    ['15/02/2023', 'Venda de produto', 'Vendas', 800],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ];
  recData.forEach((row, i) => {
    wsRec.getRow(3 + i).values = row;
    styleExcelRow(wsRec, 3 + i, 4, i % 2 === 0);
    if (typeof row[3] === 'number') {
      wsRec.getRow(3 + i).getCell(4).numFmt = '#,##0.00';
    }
  });
  // Total
  const totalRecRow = 3 + recData.length;
  wsRec.getRow(totalRecRow).values = ['', '', 'TOTAL:', { formula: `SUM(D3:D${totalRecRow - 1})` }];
  wsRec.getRow(totalRecRow).getCell(3).font = { bold: true, size: 11, name: 'Arial', color: { argb: 'FF1B4332' } };
  wsRec.getRow(totalRecRow).getCell(4).font = { bold: true, size: 12, name: 'Arial', color: { argb: 'FF1B4332' } };
  wsRec.getRow(totalRecRow).getCell(4).numFmt = '#,##0.00';

  // ---- ABA DESPESAS ----
  const wsDesp = wb.addWorksheet('Despesas', { properties: { tabColor: { argb: 'FFD4A843' } } });
  wsDesp.columns = [
    { header: '', width: 15 },
    { header: '', width: 35 },
    { header: '', width: 18 },
    { header: '', width: 18 },
    { header: '', width: 22 },
  ];
  styleExcelTitle(wsDesp, 1, 5, '💸 CONTROLE DE DESPESAS');
  wsDesp.getRow(2).values = ['Data', 'Descrição', 'Categoria', 'Valor (R$)', 'Forma de Pagamento'];
  styleExcelHeader(wsDesp, 2, 5);
  const despData = [
    ['01/02/2023', 'Aluguel', 'Moradia', 2000, 'Transferência'],
    ['05/02/2023', 'Supermercado', 'Alimentação', 800, 'Cartão de crédito'],
    ['08/02/2023', 'Conta de luz', 'Contas', 250, 'Débito automático'],
    ['12/02/2023', 'Transporte', 'Transporte', 400, 'Pix'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  despData.forEach((row, i) => {
    wsDesp.getRow(3 + i).values = row;
    styleExcelRow(wsDesp, 3 + i, 5, i % 2 === 0);
    if (typeof row[3] === 'number') {
      wsDesp.getRow(3 + i).getCell(4).numFmt = '#,##0.00';
    }
  });
  const totalDespRow = 3 + despData.length;
  wsDesp.getRow(totalDespRow).values = ['', '', 'TOTAL:', { formula: `SUM(D3:D${totalDespRow - 1})` }, ''];
  wsDesp.getRow(totalDespRow).getCell(3).font = { bold: true, size: 11, name: 'Arial', color: { argb: 'FFD4A843' } };
  wsDesp.getRow(totalDespRow).getCell(4).font = { bold: true, size: 12, name: 'Arial', color: { argb: 'FFD4A843' } };
  wsDesp.getRow(totalDespRow).getCell(4).numFmt = '#,##0.00';

  // ---- ABA RESUMO ----
  const wsRes = wb.addWorksheet('Resumo Mensal', { properties: { tabColor: { argb: 'FF1B4332' } } });
  wsRes.columns = [
    { header: '', width: 18 },
    { header: '', width: 22 },
    { header: '', width: 22 },
    { header: '', width: 22 },
  ];
  styleExcelTitle(wsRes, 1, 4, '📊 RESUMO FINANCEIRO MENSAL');
  wsRes.getRow(2).values = ['Mês', 'Total Receitas (R$)', 'Total Despesas (R$)', 'Saldo (R$)'];
  styleExcelHeader(wsRes, 2, 4);
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  meses.forEach((mes, i) => {
    wsRes.getRow(3 + i).values = [mes, 0, 0, { formula: `B${3 + i}-C${3 + i}` }];
    styleExcelRow(wsRes, 3 + i, 4, i % 2 === 0);
    [2, 3, 4].forEach(c => { wsRes.getRow(3 + i).getCell(c).numFmt = '#,##0.00'; });
  });

  // ---- ABA METAS ----
  const wsMetas = wb.addWorksheet('Metas de Economia', { properties: { tabColor: { argb: 'FF2D6A4F' } } });
  wsMetas.columns = [
    { header: '', width: 8 },
    { header: '', width: 35 },
    { header: '', width: 22 },
    { header: '', width: 22 },
    { header: '', width: 15 },
  ];
  styleExcelTitle(wsMetas, 1, 5, '🎯 METAS DE ECONOMIA');
  wsMetas.getRow(2).values = ['#', 'Descrição', 'Objetivo', 'Valor Alvo (R$)', 'Status'];
  styleExcelHeader(wsMetas, 2, 5);
  const metasData = [
    [1, 'Reduzir despesas mensais', 'Limite de despesa', 500, 'Em progresso'],
    [2, 'Aumentar receitas mensais', 'Objetivo de economia', 1000, 'Pendente'],
    [3, '', '', '', ''],
    [4, '', '', '', ''],
    [5, '', '', '', ''],
  ];
  metasData.forEach((row, i) => {
    wsMetas.getRow(3 + i).values = row;
    styleExcelRow(wsMetas, 3 + i, 5, i % 2 === 0);
    wsMetas.getRow(3 + i).getCell(4).numFmt = '#,##0.00';
  });

  await wb.xlsx.writeFile('templates/excel/01_controle_financeiro_mensal.xlsx');
  console.log('  ✅ XLSX criado: templates/excel/01_controle_financeiro_mensal.xlsx');
}

async function createPlanejamentoSemanal() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'POUPE';

  const ws = wb.addWorksheet('Planejamento Semanal', { properties: { tabColor: { argb: 'FF40916C' } } });
  ws.columns = [
    { header: '', width: 18 },
    { header: '', width: 18 },
    { header: '', width: 35 },
    { header: '', width: 14 },
    { header: '', width: 14 },
    { header: '', width: 35 },
  ];

  styleExcelTitle(ws, 1, 6, '📅 PLANEJAMENTO SEMANAL');
  ws.getRow(2).values = ['Dia da Semana', 'Horário', 'Tarefa', 'Prioridade', 'Status', 'Observações'];
  styleExcelHeader(ws, 2, 6);

  const data = [
    ['Segunda-feira', '08:00 - 09:00', 'Reunião com equipes', 'Alta', 'Pendente', 'Discutir objetivos e prioridades'],
    ['Segunda-feira', '09:00 - 10:30', 'Planejamento de projetos', 'Média', 'Em andamento', 'Lista de tarefas do dia'],
    ['Terça-feira', '08:00 - 09:00', 'Reunião com equipes', 'Baixa', 'Pendente', 'Progresso e novas sugestões'],
    ['Terça-feira', '09:30 - 11:00', 'Treinamento profissional', 'Média', 'Em andamento', 'Ferramentas de trabalho'],
    ['Quarta-feira', '08:00 - 09:00', 'Planejamento de eventos', 'Alta', 'Pendente', 'Detalhes do evento com cliente'],
    ['Quarta-feira', '10:30 - 12:30', 'Planejamento financeiro', 'Média', 'Em andamento', 'Contas e orçamentos'],
    ['Quinta-feira', '08:00 - 09:00', 'Reunião com equipes', 'Baixa', 'Pendente', 'Progresso e novas sugestões'],
    ['Quinta-feira', '09:00 - 11:00', '', '', '', ''],
    ['Sexta-feira', '10:30 - 12:30', 'Planejamento de marketing', 'Média', 'Em andamento', 'Estratégias digitais'],
    ['Sexta-feira', '14:00 - 16:00', 'Treinamento profissional', 'Média', 'Pendente', 'Ferramentas de trabalho'],
    ['Sábado', '09:30 - 12:30', 'Planejamento de projetos', 'Alta', 'Pendente', 'Objetivos da semana'],
    ['Sábado', '14:00 - 16:00', 'Planejamento financeiro', 'Média', 'Em andamento', 'Contas e orçamentos'],
    ['Domingo', '09:30 - 12:30', 'Revisão semanal', 'Baixa', 'Pendente', 'Progresso e planejamento'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
  ];

  data.forEach((row, i) => {
    ws.getRow(3 + i).values = row;
    styleExcelRow(ws, 3 + i, 6, i % 2 === 0);
    // Conditional color for priority
    const prioCell = ws.getRow(3 + i).getCell(4);
    if (row[3] === 'Alta') {
      prioCell.font = { bold: true, size: 10, name: 'Arial', color: { argb: 'FFDC2626' } };
    } else if (row[3] === 'Média') {
      prioCell.font = { bold: true, size: 10, name: 'Arial', color: { argb: 'FFD4A843' } };
    } else if (row[3] === 'Baixa') {
      prioCell.font = { bold: true, size: 10, name: 'Arial', color: { argb: 'FF40916C' } };
    }
    // Status color
    const statusCell = ws.getRow(3 + i).getCell(5);
    if (row[4] === 'Pendente') {
      statusCell.font = { size: 10, name: 'Arial', color: { argb: 'FFDC2626' } };
    } else if (row[4] === 'Em andamento') {
      statusCell.font = { size: 10, name: 'Arial', color: { argb: 'FF2563EB' } };
    }
  });

  // Data validation for priority
  for (let r = 3; r <= 3 + data.length; r++) {
    ws.getRow(r).getCell(4).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Alta,Média,Baixa"'],
    };
    ws.getRow(r).getCell(5).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Pendente,Em andamento,Concluído"'],
    };
  }

  await wb.xlsx.writeFile('templates/excel/02_planejamento_semanal.xlsx');
  console.log('  ✅ XLSX criado: templates/excel/02_planejamento_semanal.xlsx');
}

async function createTrackerOKR() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'POUPE';

  // ---- ABA METAS TRIMESTRAIS ----
  const wsMetas = wb.addWorksheet('Metas Trimestrais', { properties: { tabColor: { argb: 'FF1B4332' } } });
  wsMetas.columns = [
    { header: '', width: 30 },
    { header: '', width: 15 },
    { header: '', width: 15 },
    { header: '', width: 35 },
    { header: '', width: 35 },
    { header: '', width: 20 },
    { header: '', width: 15 },
  ];
  styleExcelTitle(wsMetas, 1, 7, '🎯 TRACKER DE METAS E OKRs — METAS TRIMESTRAIS');
  wsMetas.getRow(2).values = ['Título da Meta', 'Data Início', 'Prazo', 'Objetivos Específicos', 'Tarefas', 'Resultado Esperado', '% Progresso'];
  styleExcelHeader(wsMetas, 2, 7);
  for (let i = 0; i < 8; i++) {
    wsMetas.getRow(3 + i).values = ['', '', '', '', '', '', 0];
    styleExcelRow(wsMetas, 3 + i, 7, i % 2 === 0);
    wsMetas.getRow(3 + i).getCell(7).numFmt = '0%';
  }

  // ---- ABA PESSOAL ----
  const wsPessoal = wb.addWorksheet('Metas Pessoais', { properties: { tabColor: { argb: 'FF40916C' } } });
  wsPessoal.columns = [
    { header: '', width: 25 },
    { header: '', width: 35 },
    { header: '', width: 35 },
    { header: '', width: 25 },
    { header: '', width: 15 },
  ];
  styleExcelTitle(wsPessoal, 1, 5, '🧑 METAS PESSOAIS');
  wsPessoal.getRow(2).values = ['Nome', 'Metas Trimestrais', 'Tarefas', 'Resultado', '% Progresso'];
  styleExcelHeader(wsPessoal, 2, 5);
  const pessoalEx = [
    ['João Gabriel', 'Aumentar saúde física e mental em 10%', 'Exercícios 3x/semana, meditação diária', 'Melhoria de 10%', 0],
    ['', '', '', '', 0],
    ['', '', '', '', 0],
    ['', '', '', '', 0],
  ];
  pessoalEx.forEach((row, i) => {
    wsPessoal.getRow(3 + i).values = row;
    styleExcelRow(wsPessoal, 3 + i, 5, i % 2 === 0);
    wsPessoal.getRow(3 + i).getCell(5).numFmt = '0%';
  });

  // ---- ABA PROFISSIONAL ----
  const wsProf = wb.addWorksheet('Metas Profissionais', { properties: { tabColor: { argb: 'FF2D6A4F' } } });
  wsProf.columns = [
    { header: '', width: 25 },
    { header: '', width: 35 },
    { header: '', width: 35 },
    { header: '', width: 25 },
    { header: '', width: 15 },
  ];
  styleExcelTitle(wsProf, 1, 5, '💼 METAS PROFISSIONAIS');
  wsProf.getRow(2).values = ['Nome', 'Metas Trimestrais', 'Tarefas', 'Resultado', '% Progresso'];
  styleExcelHeader(wsProf, 2, 5);
  const profEx = [
    ['Maria Ana', 'Aumentar eficiência em 15%, reduzir resposta para 30min', 'Otimização de processos', 'Medição semanal', 0],
    ['', '', '', '', 0],
    ['', '', '', '', 0],
    ['', '', '', '', 0],
  ];
  profEx.forEach((row, i) => {
    wsProf.getRow(3 + i).values = row;
    styleExcelRow(wsProf, 3 + i, 5, i % 2 === 0);
    wsProf.getRow(3 + i).getCell(5).numFmt = '0%';
  });

  // ---- ABA REVISÃO MENSAL ----
  const wsRev = wb.addWorksheet('Revisão Mensal', { properties: { tabColor: { argb: 'FFD4A843' } } });
  wsRev.columns = [
    { header: '', width: 18 },
    { header: '', width: 35 },
    { header: '', width: 40 },
    { header: '', width: 15 },
  ];
  styleExcelTitle(wsRev, 1, 4, '📋 REVISÃO MENSAL DE METAS');
  wsRev.getRow(2).values = ['Data de Revisão', 'Objetivos Trimestrais', 'Progresso', 'Status'];
  styleExcelHeader(wsRev, 2, 4);
  for (let i = 0; i < 12; i++) {
    wsRev.getRow(3 + i).values = ['', '', '', ''];
    styleExcelRow(wsRev, 3 + i, 4, i % 2 === 0);
    wsRev.getRow(3 + i).getCell(4).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"No prazo,Atrasado,Concluído,Cancelado"'],
    };
  }

  await wb.xlsx.writeFile('templates/excel/03_tracker_metas_okr.xlsx');
  console.log('  ✅ XLSX criado: templates/excel/03_tracker_metas_okr.xlsx');
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  🚀 POUPE — Gerador de Documentos Profissionais ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  console.log('📄 Gerando documentos Word (.docx)...');
  console.log('  ─── templates/word ───');
  await createPropostaComercial();
  await createContratoPrestacao();
  await createBriefingProjeto();

  console.log('');
  console.log('📊 Gerando planilhas Excel (.xlsx)...');
  console.log('  ─── templates/excel ───');
  await createControleFinanceiro();
  await createPlanejamentoSemanal();
  await createTrackerOKR();

  console.log('');
  console.log('📣 Gerando documentos Marketing (.docx)...');
  console.log('  ─── templates/marketing ───');
  await createRoteiroVSL();
  await createCopyPaginaVendas();
  await createSequenciaEmails();

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  ✅ TODOS OS 9 DOCUMENTOS GERADOS COM SUCESSO!  ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('📁 Documentos criados:');
  console.log('');
  console.log('  📄 WORD (.docx):');
  console.log('     • templates/word/01_proposta_comercial.docx');
  console.log('     • templates/word/02_contrato_prestacao_servicos.docx');
  console.log('     • templates/word/03_briefing_projeto.docx');
  console.log('');
  console.log('  📊 EXCEL (.xlsx):');
  console.log('     • templates/excel/01_controle_financeiro_mensal.xlsx');
  console.log('     • templates/excel/02_planejamento_semanal.xlsx');
  console.log('     • templates/excel/03_tracker_metas_okr.xlsx');
  console.log('');
  console.log('  📣 MARKETING (.docx):');
  console.log('     • templates/marketing/01_roteiro_vsl.docx');
  console.log('     • templates/marketing/02_copy_pagina_vendas.docx');
  console.log('     • templates/marketing/03_sequencia_emails_lancamento.docx');
  console.log('');
}

main().catch(err => {
  console.error('❌ Erro:', err);
  process.exit(1);
});
