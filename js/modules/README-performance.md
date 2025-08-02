# Performance Module

Este módulo implementa otimizações avançadas de performance para o site, incluindo Resource Hints, cache headers, error handling e fallbacks para CDNs.

## Funcionalidades

### 1. Resource Hints (dns-prefetch, preconnect)

O módulo automaticamente adiciona:
- **DNS Prefetch** para domínios externos como Google Fonts, CDNs, redes sociais
- **Preconnect** para recursos críticos como fontes e CDNs principais

### 2. Cache Headers via Meta Tags

Configura automaticamente:
- Cache-Control headers via meta tags
- ETags para controle de cache
- Configurações de stale-while-revalidate

### 3. Error Handling para Recursos Externos

- Intercepta erros de carregamento de recursos
- Implementa fallbacks automáticos
- Logs centralizados de erros
- Integração com Google Analytics para tracking de erros

### 4. Fallbacks para CDNs

Implementa fallbacks para:
- **Font Awesome**: cdnjs.cloudflare.com → cdn.jsdelivr.net
- **Google Fonts**: fonts.googleapis.com → fonts.gstatic.com
- **Analytics**: googletagmanager.com → google-analytics.com

## Como Usar

### Inclusão Automática

O módulo é carregado automaticamente quando incluído no layout:

```html
<script type="text/javascript" src="{{ asset('js/modules/performance.js') }}" defer></script>
```

### Configuração

O módulo pode ser configurado através do objeto `PERFORMANCE_CONFIG`:

```javascript
const PERFORMANCE_CONFIG = {
    externalResources: {
        fonts: {
            primary: 'https://fonts.googleapis.com',
            fallback: 'https://fonts.gstatic.com'
        },
        icons: {
            primary: 'https://cdnjs.cloudflare.com',
            fallback: 'https://cdn.jsdelivr.net'
        },
        analytics: {
            primary: 'https://www.googletagmanager.com',
            fallback: 'https://www.google-analytics.com'
        }
    },
    timeouts: {
        resourceLoad: 5000, // 5 segundos
        dnsPrefetch: 1000,  // 1 segundo
        preconnect: 2000    // 2 segundos
    },
    cache: {
        maxAge: 31536000, // 1 ano
        staleWhileRevalidate: 86400 // 1 dia
    }
};
```

### API Pública

O módulo expõe utilitários através de `window.PerformanceUtils`:

```javascript
// Medir tempo de carregamento da página
const loadTimes = PerformanceUtils.measurePageLoadTime();
console.log('Tempo total:', loadTimes.total);

// Otimizar imagens com lazy loading
PerformanceUtils.optimizeImages();

// Preloadar recursos críticos
PerformanceUtils.preloadCriticalResources();
```

## Monitoramento

### Core Web Vitals

O módulo monitora automaticamente:
- **LCP (Largest Contentful Paint)**
- **FID (First Input Delay)**
- **CLS (Cumulative Layout Shift)**

### Métricas de Performance

- Tempo de carregamento de recursos
- Taxa de erro de recursos externos
- Performance de CDNs

## Logs e Debug

O módulo fornece logs detalhados no console:

```javascript
// Logs de inicialização
Performance Module initialized successfully

// Logs de recursos carregados
Resource loaded: /css/theme.min.css in 150ms

// Logs de fallbacks
Loading fallback: https://cdn.jsdelivr.net/...

// Logs de erros
Performance Error: { message: "...", filename: "...", line: 123 }
```

## Compatibilidade

- **Navegadores Modernos**: Suporte completo
- **Navegadores Legados**: Fallbacks implementados
- **Mobile**: Otimizado para dispositivos móveis

## Integração com Analytics

Se o Google Analytics estiver disponível (`window.gtag`), o módulo automaticamente:
- Envia métricas de Core Web Vitals
- Reporta erros de performance
- Monitora tempo de carregamento

## Exemplo de Implementação

```html
<!-- No head do documento -->
<script type="text/javascript" src="{{ asset('js/modules/performance.js') }}" defer></script>

<!-- O módulo será inicializado automaticamente -->
<script>
// Acessar utilitários após carregamento
document.addEventListener('DOMContentLoaded', () => {
    if (window.PerformanceUtils) {
        const metrics = PerformanceUtils.measurePageLoadTime();
        console.log('Performance metrics:', metrics);
    }
});
</script>
```

## Troubleshooting

### Problemas Comuns

1. **Erros de CORS**: Verifique se os domínios estão na lista de preconnect
2. **Fallbacks não funcionando**: Verifique se os CDNs alternativos estão acessíveis
3. **Performance lenta**: Monitore os logs para identificar gargalos

### Debug Mode

Para ativar logs detalhados, adicione no console:

```javascript
localStorage.setItem('performanceDebug', 'true');
```

## Versão

- **Versão**: 1.0.0
- **Última atualização**: Dezembro 2024
- **Compatibilidade**: ES6+ 