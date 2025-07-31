# Alterações no Cabeçalho - Estrutura Genérica

## Resumo das Alterações

Este documento descreve as alterações implementadas no cabeçalho do site conforme a especificação fornecida.

## Arquivos Modificados

### 1. `elements/header.html`
- **Antes**: Estrutura baseada em Bootstrap com colunas e snippets separados
- **Depois**: Nova estrutura genérica com container principal e elementos organizados

### 2. `css/custom.css.html`
- **Adicionado**: Estilos CSS completos para o novo cabeçalho
- **Incluído**: Sobrescrita de estilos antigos do tema

### 3. `test-header.html` (Novo)
- **Criado**: Arquivo de teste para verificar a implementação

## Estrutura do Novo Cabeçalho

### Container Principal
```html
<header class="main-header">
    <div class="header-container">
        <!-- Elementos do cabeçalho -->
    </div>
</header>
```

**Características:**
- Largura total (100%)
- Altura fixa (70px desktop, 60px mobile)
- Layout flexbox com `justify-content: space-between`
- Fundo branco com sombra sutil

### 1. Logotipo
```html
<div class="header-logo">
    <a href="{{ links.home }}" class="site-logo">
        {{ Image('logo') }}
    </a>
</div>
```

**Características:**
- Posicionado à esquerda
- Altura máxima de 50px
- Largura máxima de 200px
- Responsivo para mobile

### 2. Campo de Busca
```html
<div class="header-search">
    <div class="search-container">
        <form role="form" action="{{ links.search }}" method="get">
            <div class="search-input-group">
                <input class="search-input" type="text" placeholder="{{ Translation('buscar') }}">
                <button class="search-button" type="submit">
                    <!-- Ícone de lupa SVG -->
                </button>
            </div>
        </form>
    </div>
</div>
```

**Características:**
- Centralizado no header
- Input com bordas arredondadas à esquerda
- Botão com bordas arredondadas à direita
- Ícone de lupa centralizado
- Sombra sutil para destaque

### 3. Canal de Contato (WhatsApp)
```html
<div class="header-contact">
    <div class="contact-channel">
        <div class="contact-icon">
            <!-- Ícone WhatsApp SVG -->
        </div>
        <div class="contact-info">
            <span class="contact-label">WhatsApp</span>
            <span class="contact-number">(11) 99999-9999</span>
        </div>
    </div>
</div>
```

**Características:**
- Ícone circular verde (#25d366)
- Texto identificando o canal
- Número de contato
- Hover com mudança de fundo

### 4. Acesso à Conta
```html
<div class="header-account">
    <div class="account-access">
        <div class="account-icon">
            <!-- Ícone usuário SVG -->
        </div>
        <div class="account-info">
            <a href="{{ links.login }}">{{ Translation('login') }}</a>
        </div>
    </div>
</div>
```

**Características:**
- Ícone circular com cor primária
- Texto "Entrar" ou nome do usuário logado
- Hover com mudança de fundo

### 5. Carrinho de Compras
```html
<div class="header-cart">
    <a href="{{ links.cart }}" class="cart-button">
        <div class="cart-icon">
            <!-- Ícone carrinho SVG -->
            <span class="cart-badge">{{ cart.amount }}</span>
        </div>
        <div class="cart-info">
            <div class="cart-amount">{{ cart.amount }} itens</div>
            <div class="cart-total">{{ settings.currency }} {{ cart.price }}</div>
        </div>
    </a>
</div>
```

**Características:**
- Botão com fundo destacado
- Ícone de carrinho com badge numérico
- Informações de quantidade e valor
- Bordas arredondadas

## Responsividade

### Desktop (> 768px)
- Todos os elementos visíveis
- Campo de busca com largura máxima de 400px
- Informações completas nos elementos

### Tablet (768px - 576px)
- Campo de busca reduzido (200px)
- Informações de texto ocultas
- Ícones menores (28px)

### Mobile (< 576px)
- Campo de busca oculto
- Altura reduzida (60px)
- Apenas ícones visíveis
- Logotipo menor (40px)

## Estilos CSS

### Cores Utilizadas
- **Primária**: `{{ settings.color_primary }}` (configurável)
- **WhatsApp**: `#25d366`
- **Carrinho Badge**: `#ff4444`
- **Fundo**: `#ffffff`
- **Bordas**: `#e2e2e2`

### Tipografia
- **Família**: Roboto (herdada do tema)
- **Tamanhos**: 11px a 14px conforme elemento
- **Pesos**: 400, 500, 600 conforme hierarquia

### Efeitos
- **Transições**: 0.3s ease para hover
- **Sombras**: 0 2px 4px rgba(0,0,0,0.1)
- **Border-radius**: 20px para elementos, 25px para busca

## Compatibilidade

### Sobrescrita de Estilos Antigos
O CSS inclui regras com `!important` para sobrescrever estilos antigos do tema:
- `.site-logo` e suas variações
- `.search` e componentes relacionados
- `.cart` e componentes relacionados
- `.customer` (oculto no novo header)

### Integração com Tema
- Utiliza variáveis de cor do tema (`{{ settings.color_primary }}`)
- Mantém funcionalidades existentes (links, traduções)
- Preserva menu mobile original

## Teste

Para testar a implementação:
1. Abra o arquivo `test-header.html` em um navegador
2. Redimensione a janela para testar responsividade
3. Verifique se todos os elementos estão funcionando corretamente

## Próximos Passos

1. **Personalização**: Ajustar cores e estilos conforme identidade visual
2. **Funcionalidades**: Implementar dropdown no carrinho se necessário
3. **Acessibilidade**: Adicionar atributos ARIA e melhorar navegação por teclado
4. **Performance**: Otimizar CSS e JavaScript se necessário

## Notas Técnicas

- O novo cabeçalho é totalmente responsivo
- Mantém compatibilidade com o sistema de templates existente
- Utiliza flexbox para layout moderno
- Inclui fallbacks para navegadores antigos
- Preserva funcionalidades de busca e carrinho existentes 