import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType, ShadingType, Header, Footer, PageNumber } from 'docx';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

// ============================================================
// DESIGN SYSTEM POUPE
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
  darkText: '111827',
};

// ============================================================
// UTILITÁRIOS DOCX
// ============================================================
function createHeader(nicho) {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: 'POUPE', bold: true, size: 24, color: COLORS.primary, font: 'Arial' }),
          new TextRun({ text: `  |  Nicho: ${nicho}`, size: 18, color: COLORS.gray, font: 'Arial' }),
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
          new TextRun({ text: '© 2026 POUPE  •  Documento Gerado para [NOME_USUARIO]  •  Página ', size: 14, color: COLORS.gray, font: 'Arial' }),
          new TextRun({ children: [PageNumber.CURRENT], size: 14, color: COLORS.gray, font: 'Arial' }),
        ],
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 1, color: COLORS.light } },
        spacing: { before: 200 },
      }),
    ],
  });
}

function titlePara(text) {
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 32, color: COLORS.primary, font: 'Arial' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 300 },
  });
}

function subtitlePara(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, color: COLORS.secondary, font: 'Arial' })],
    spacing: { before: 300, after: 150 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.accent } },
  });
}

function bodyPara(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, color: COLORS.darkText, font: 'Arial', ...opts })],
    spacing: { before: 100, after: 100 },
    indent: opts.indent ? { left: 400 } : undefined,
    alignment: opts.center ? AlignmentType.CENTER : undefined,
  });
}

function bulletPara(text) {
  return new Paragraph({
    children: [new TextRun({ text: '● ', color: COLORS.accent, bold: true, size: 20, font: 'Arial' }), new TextRun({ text, size: 20, color: COLORS.darkText, font: 'Arial' })],
    spacing: { before: 50, after: 50 },
    indent: { left: 400, hanging: 200 },
  });
}

function fieldPara(label, placeholder = '________________________________') {
  return new Paragraph({
    children: [
      new TextRun({ text: label + ': ', bold: true, size: 20, color: COLORS.secondary, font: 'Arial' }),
      new TextRun({ text: placeholder, size: 20, color: COLORS.gray, font: 'Arial', italics: true }),
    ],
    spacing: { before: 100, after: 100 },
    indent: { left: 400 },
  });
}

function signaturePara(name) {
  return [
    new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 600 } }),
    new Paragraph({ children: [new TextRun({ text: '________________________________________', size: 20 })], alignment: AlignmentType.CENTER }),
    new Paragraph({ children: [new TextRun({ text: name, size: 20, italics: true })], alignment: AlignmentType.CENTER }),
  ];
}

// ============================================================
// MOTOR DE PROCESSAMENTO INTELIGENTE (MD -> OFFICE)
// ============================================================

function parseYaml(yamlBlock) {
  const metadata = {};
  const lines = yamlBlock.split('\n');
  lines.forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value.length) {
      metadata[key.trim()] = value.join(':').trim();
    }
  });
  return metadata;
}

async function convertMdToDocx(mdContent, metadata, outputPath) {
  const lines = mdContent.split('\n');
  const children = [];
  let currentTable = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith('# ')) {
      children.push(titlePara(line.substring(2)));
    } else if (line.startsWith('## ')) {
      children.push(subtitlePara(line.substring(3)));
    } else if (line.startsWith('**') && line.includes(':**')) {
      const parts = line.split(':**');
      const label = parts[0].replace(/\*\*/g, '').trim();
      const value = parts[1].trim();
      children.push(fieldPara(label, value));
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      children.push(bulletPara(line.substring(2)));
    } else if (line.startsWith('|')) {
      // Processamento básico de tabela
      if (line.includes('---')) continue; 
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
      if (cells.length > 0) {
        // Docx table logic can be complex, for now we list as body with styling
        children.push(bodyPara(cells.join('  |  '), { bold: true, color: COLORS.primary }));
      }
    } else if (line.startsWith('____')) {
      children.push(...signaturePara('[Assinatura]'));
    } else {
      children.push(bodyPara(line));
    }
  }

  const doc = new Document({
    sections: [{
      headers: { default: createHeader(metadata.nicho || 'Geral') },
      footers: { default: createFooter() },
      children
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
}

async function convertMdToXlsx(mdContent, metadata, outputPath) {
  const wb = new ExcelJS.Workbook();
  const sheets = mdContent.split('## Aba:');
  
  for (let i = 1; i < sheets.length; i++) {
    const sheetData = sheets[i].trim();
    const sheetName = sheetData.split('\n')[0].trim();
    const ws = wb.addWorksheet(sheetName.substring(0, 31));
    
    const tableLines = sheetData.split('\n').filter(l => l.includes('|') && !l.includes('---'));
    tableLines.forEach((line, rowIndex) => {
      const cells = line.split('|').filter(c => c.trim() || line.startsWith('|') || line.endsWith('|')).map(c => c.trim());
      // Remove empty first/last if they exist due to split
      if (line.startsWith('|')) cells.shift();
      if (line.endsWith('|')) cells.pop();

      const row = ws.addRow(cells);
      if (rowIndex === 0) {
        row.eachCell(cell => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + COLORS.primary } };
          cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
        });
      }
    });

    ws.columns.forEach(col => { col.width = 20; });
  }

  await wb.xlsx.writeFile(outputPath);
}

async function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const parts = content.split('---');
  if (parts.length < 3) return;

  const metadata = parseYaml(parts[1]);
  const body = parts.slice(2).join('---').trim();
  const outputDir = path.dirname(filePath);
  const fileName = path.basename(filePath, '.md');

  if (metadata.type === 'docx') {
    await convertMdToDocx(body, metadata, path.join(outputDir, fileName + '.docx'));
  } else if (metadata.type === 'xlsx') {
    await convertMdToXlsx(body, metadata, path.join(outputDir, fileName + '.xlsx'));
  }
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('💎 Iniciando Upgrade POUPE Pro (Markdown-to-Office Engine)...');
  
  const categories = ['01_geral', '02_financeiro', '03_academia', '04_nutricao', '05_educacao', '06_vendas'];
  
  for (const cat of categories) {
    const dirPath = path.join('templates', cat);
    if (!fs.existsSync(dirPath)) continue;

    console.log(`\n📂 Processando Nicho: ${cat.split('_')[1].toUpperCase()}`);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    
    for (const file of files) {
      await processFile(path.join(dirPath, file));
      console.log(`  ✨ Gerado: ${file.replace('.md', '')}`);
    }
  }

  console.log('\n🚀 UPGRADE COMPLETO! 60+ DOCUMENTOS AGORA SÃO PROFISSIONAIS.');
}

main().catch(console.error);
