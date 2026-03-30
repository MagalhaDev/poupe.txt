# Nimbus - Productivity App 🚀

**Nimbus** é um aplicativo de produtividade focado em fornecer templates e recursos prontos para diversas áreas e nichos (Geral, Financeiro, Nutrição, Academia, Vendas, Educação). O aplicativo funciona tanto no navegador Web quanto como um App Desktop Nativo, entregando uma interface fluida, responsiva e moderna.

## 🗂 Estrutura do Projeto e Partes da Aplicação

O projeto possui uma estrutura bem definida em React, gerenciando o seu estado e navegação de maneira clara:

1. **Dashboard & Explorador (Home) 🏠**
   - **`DesktopShowcase` & `ShowcaseBox`**: Painel inicial que exibe recomendações, itens da área de trabalho e atalhos rápidos de navegação.
   - **`Categories` & `NicheFilters`**: Navegação que permite filtrar o banco de templates por tipo (Documentos, Planilhas, Marketing) ou nicho de atuação (Vendas, Nutrição, etc.).
   - **`TemplateGrid` & `SearchBar`**: Visualização em formato de grid adaptativo dos templates encontrados, além de um motor de busca para consultas instantâneas.

2. **Navegação & Telas Secundárias 🧭**
   - **`Sidebar` & `BottomNav`**: Garante a navegação responsiva — menu lateral espedido no Desktop e menu inferior no Mobile.
   - **`RecentsScreen`**: Histórico que salva e mostra os últimos templates abertos pelo usuário.
   - **`FavoritesScreen`**: Área de salvamento, apresentando apenas os templates favoritados marcados com estrela.

3. **Editor & Interação ✍️**
   - **`Editor`**: Quando um template é selecionado, o editor dinâmico sobrepõe a tela para leitura e edição, trazendo foco total ao documento.
   - **`Toast` (Notificações)**: Sistema de notificações pop-up minimalistas pelo hook `useToast.js` para indicar quando um item foi salvo ou aberto.

4. **Gerenciamento de Dados (Hooks & Data) 💾**
   - **`hooks/useFavorites.js` e `hooks/useRecents.js`**: Hooks inteligentes que tratam o salvamento e histórico das atividades do usuário.
   - **`data/templates.js`**: Onde todo o banco e o conteúdo dos mais de 100+ templates vêm integrados para carregamento instantâneo.

## 🛠 Tecnologias Utilizadas

- **React 19 + Vite 8**: Core da interface e motor de build ultrarrápido.
- **Electron 41**: Framework para portar a aplicação React diretamente para um software instalável no Mac e Windows.
- **Framer Motion**: Responsável por trazer vida ao layout por meio de transições suaves e micro-interações.
- **Phosphor Icons**: Usado para ícones minimalistas e em alta qualidade.

## 🚀 Como Rodar o Projeto

**Para Desenvolvimento Web (Navegador):**
```bash
npm install
npm run dev
```

**Para Desenvolvimento Desktop (Janela do Electron):**
```bash
npm run electron:dev
```

**Para Exportar (Gerar Instalador):**
```bash
npm run electron:build:mac  # Cria e exporta o App para macOS (.dmg)
npm run electron:build:win  # Cria e exporta o App para Windows (.exe)
```
