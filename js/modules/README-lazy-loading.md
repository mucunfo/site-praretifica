# Sistema de Lazy Loading de Imagens

## Visão Geral

Este sistema implementa lazy loading de imagens usando a Intersection Observer API com fallback para navegadores antigos. Ele inclui placeholders com blur effect durante o carregamento e suporte automático ao atributo `loading="lazy"`.

## Funcionalidades

### ✅ Intersection Observer API
- Detecta quando imagens entram na viewport
- Configurável com threshold e rootMargin
- Performance otimizada

### ✅ Fallback para Navegadores Antigos
- Suporte automático para navegadores sem Intersection Observer
- Polling inteligente para detectar visibilidade
- Compatibilidade com IE11+

### ✅ Placeholder com Blur Effect
- Placeholder animado com efeito shimmer
- Transição suave de blur para imagem nítida
- SVG placeholders responsivos

### ✅ Loading="lazy" Automático
- Adiciona automaticamente o atributo a imagens
- Preserva imagens acima do fold
- Suporte a múltiplos formatos de dados

## Como Usar

### 1. Inclusão Automática
O sistema é carregado automaticamente através do layout principal:

```html
<script src="js/modules/lazy-loading.js" defer></script>
```

### 2. Configuração de Imagens

#### Opção 1: Atributo loading="lazy" (Recomendado)
```html
<img src="imagem.jpg" alt="Descrição" loading="lazy">
```

#### Opção 2: Classe lazy
```html
<img src="placeholder.jpg" data-original="imagem.jpg" class="lazy" alt="Descrição">
```

#### Opção 3: Data-lazy
```html
<img data-lazy="imagem.jpg" alt="Descrição">
```

### 3. Configurações

```javascript
const CONFIG = {
    threshold: 0.1,           // Porcentagem da imagem visível para carregar
    rootMargin: '50px',       // Margem adicional para pré-carregamento
    placeholderClass: 'lazy-placeholder',
    loadedClass: 'lazy-loaded',
    loadingClass: 'lazy-loading',
    errorClass: 'lazy-error',
    blurClass: 'lazy-blur',
    fadeInClass: 'lazy-fade-in'
};
```

## API Pública

### Instância Global
```javascript
// Acessar instância global
window.lazyLoading

// Ou classe construtora
window.LazyLoading
```

### Métodos Disponíveis

#### refresh()
Recarrega e processa novas imagens:
```javascript
window.lazyLoading.refresh();
```

#### destroy()
Remove observers e limpa recursos:
```javascript
window.lazyLoading.destroy();
```

### Eventos Customizados

#### lazyLoading:lazyLoaded
Disparado quando uma imagem é carregada com sucesso:
```javascript
document.addEventListener('lazyLoading:lazyLoaded', (event) => {
    console.log('Imagem carregada:', event.detail.image, event.detail.src);
});
```

#### lazyLoading:lazyError
Disparado quando uma imagem falha ao carregar:
```javascript
document.addEventListener('lazyLoading:lazyError', (event) => {
    console.log('Erro ao carregar imagem:', event.detail.image);
});
```

## Classes CSS

### Estados das Imagens
- `.lazy-loading` - Imagem em processo de carregamento
- `.lazy-loaded` - Imagem carregada com sucesso
- `.lazy-error` - Erro no carregamento da imagem

### Placeholders
- `.lazy-placeholder` - Container do placeholder
- `.lazy-blur` - Efeito blur aplicado
- `.lazy-fade-in` - Animação de fade in

## Exemplos de Implementação

### Template de Produto
```html
<div class="product-image">
    <img src="{{ product.images[0].large }}" 
         alt="{{ product.name }}" 
         loading="lazy"
         width="300" 
         height="200">
</div>
```

### Banner com Data-lazy
```html
<img data-lazy="{{ slide.image }}" 
     alt="{{ slide.label }}"
     loading="lazy"
     width="100%"
     height="auto">
```

### Imagem com Fallback
```html
<img data-original="{{ product.image }}" 
     class="lazy" 
     src="{{ asset('img/loading.svg') }}" 
     alt="{{ product.name }}"
     loading="lazy">
```

## Performance

### Otimizações Implementadas
- Intersection Observer para detecção eficiente
- Placeholders SVG inline (sem requisições adicionais)
- Remoção automática de observers após carregamento
- MutationObserver para novas imagens dinâmicas

### Métricas Esperadas
- Redução de 60-80% no carregamento inicial
- Melhoria no Core Web Vitals (LCP, CLS)
- Economia de banda significativa

## Compatibilidade

### Navegadores Suportados
- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 79+
- ✅ IE 11+ (com fallback)

### Fallback Automático
Para navegadores sem Intersection Observer:
- Polling a cada 100ms
- Detecção de viewport manual
- Mesma funcionalidade com performance reduzida

## Troubleshooting

### Imagens não carregam
1. Verificar se o script está sendo carregado
2. Confirmar que as imagens têm `loading="lazy"` ou classe `lazy`
3. Verificar console para erros JavaScript

### Placeholders não aparecem
1. Verificar se o CSS está sendo aplicado
2. Confirmar que as imagens têm dimensões definidas
3. Verificar se não há conflitos de CSS

### Performance degradada
1. Verificar se muitas imagens estão sendo processadas
2. Considerar aumentar o `rootMargin`
3. Verificar se o fallback está sendo usado desnecessariamente

## Changelog

### v1.0.0
- Implementação inicial
- Intersection Observer API
- Fallback para navegadores antigos
- Placeholders com blur effect
- Suporte a loading="lazy"
- Eventos customizados
- API pública para controle 