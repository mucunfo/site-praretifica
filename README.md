# Site Praretifica - Ambiente de Build Moderno

Este projeto utiliza um ambiente de build moderno configurado com **Vite**, **Sass** e **PostCSS**.

## 🚀 Tecnologias

- **Vite** - Build tool rápida e moderna
- **Sass** - Pré-processador CSS
- **PostCSS** - Pós-processador CSS com:
  - **Autoprefixer** - Adiciona prefixos de vendor automaticamente
  - **CSSNano** - Minificação e otimização CSS
  - **PurgeCSS** - Remove CSS não utilizado

## 📦 Instalação

```bash
npm install
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento na porta 3000 com hot reload.

### Build de Produção
```bash
npm run build
```
Gera os arquivos otimizados na pasta `dist/`.

### Preview do Build
```bash
npm run preview
```
Serve localmente os arquivos de produção para teste.

## 📁 Estrutura do Projeto

```
├── css/
│   ├── main.scss          # Arquivo principal de estilos
│   ├── sass/              # Arquivos Sass organizados
│   └── ...
├── js/
│   ├── main.js            # Arquivo principal JavaScript
│   └── ...
├── dist/                  # Output do build (gerado automaticamente)
├── index.html             # Ponto de entrada HTML
├── vite.config.js         # Configuração do Vite
├── postcss.config.js      # Configuração do PostCSS
└── package.json           # Dependências e scripts
```

## ⚙️ Configurações

### Vite (`vite.config.js`)
- Output em `dist/`
- Preservação de comentários de licença
- Aliases para importações (`@css`, `@js`, `@img`)
- Servidor de desenvolvimento na porta 3000

### PostCSS (`postcss.config.js`)
- **Autoprefixer**: Adiciona prefixos de vendor
- **CSSNano**: Minificação com preservação de comentários importantes

### Sass
- Importação automática de variáveis
- Organização modular dos estilos

## 🎯 Características

- ✅ Build rápido com Vite
- ✅ Preservação de comentários de licença
- ✅ Minificação otimizada
- ✅ Prefixos de vendor automáticos
- ✅ Hot reload em desenvolvimento
- ✅ Output organizado em `dist/`

## 📝 Licença

MIT License - Veja o arquivo LICENSE para detalhes. 