/**
 * Performance Module - Otimizações de Performance
 * 
 * Este módulo implementa:
 * 1. Resource Hints (dns-prefetch, preconnect)
 * 2. Cache headers via meta tags
 * 3. Error handling para recursos externos
 * 4. Fallbacks para CDNs
 * 
 * @version 1.0.0
 * @author Site Performance
 */

(function() {
    'use strict';

    // Configurações do módulo
    const PERFORMANCE_CONFIG = {
        // CDNs e recursos externos
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
        
        // Timeouts para fallbacks
        timeouts: {
            resourceLoad: 5000, // 5 segundos
            dnsPrefetch: 1000,  // 1 segundo
            preconnect: 2000    // 2 segundos
        },
        
        // Cache settings
        cache: {
            maxAge: 31536000, // 1 ano em segundos
            staleWhileRevalidate: 86400 // 1 dia em segundos
        }
    };

    /**
     * Performance Manager Class
     */
    class PerformanceManager {
        constructor() {
            this.resourceHints = new ResourceHints();
            this.cacheManager = new CacheManager();
            this.errorHandler = new ErrorHandler();
            this.cdnFallback = new CDNFallback();
            
            this.init();
        }

        /**
         * Inicializa o módulo de performance
         */
        init() {
            try {
                // Adiciona resource hints
                this.resourceHints.addDNSPrefetch();
                this.resourceHints.addPreconnect();
                
                // Configura cache headers
                this.cacheManager.setCacheHeaders();
                
                // Configura fallbacks para CDNs
                this.cdnFallback.setupFallbacks();
                
                // Adiciona error handling
                this.errorHandler.setupErrorHandling();
                
                // Monitora performance
                this.setupPerformanceMonitoring();
                
                console.log('Performance Module initialized successfully');
            } catch (error) {
                console.error('Error initializing Performance Module:', error);
            }
        }

        /**
         * Configura monitoramento de performance
         */
        setupPerformanceMonitoring() {
            if ('performance' in window) {
                // Monitora Core Web Vitals
                this.monitorCoreWebVitals();
                
                // Monitora carregamento de recursos
                this.monitorResourceLoading();
            }
        }

        /**
         * Monitora Core Web Vitals
         */
        monitorCoreWebVitals() {
            // LCP (Largest Contentful Paint)
            if ('PerformanceObserver' in window) {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                    
                    // Envia métrica para analytics se disponível
                    if (window.gtag) {
                        window.gtag('event', 'LCP', {
                            value: Math.round(lastEntry.startTime),
                            event_category: 'Web Vitals'
                        });
                    }
                });
                
                try {
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {
                    console.warn('LCP monitoring not supported');
                }
            }
        }

        /**
         * Monitora carregamento de recursos
         */
        monitorResourceLoading() {
            if ('PerformanceObserver' in window) {
                const resourceObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.initiatorType === 'link' || entry.initiatorType === 'script') {
                            console.log(`Resource loaded: ${entry.name} in ${entry.duration}ms`);
                        }
                    });
                });
                
                try {
                    resourceObserver.observe({ entryTypes: ['resource'] });
                } catch (e) {
                    console.warn('Resource monitoring not supported');
                }
            }
        }
    }

    /**
     * Resource Hints Manager
     */
    class ResourceHints {
        constructor() {
            this.domains = [
                'fonts.googleapis.com',
                'fonts.gstatic.com',
                'cdnjs.cloudflare.com',
                'cdn.jsdelivr.net',
                'www.googletagmanager.com',
                'www.google-analytics.com',
                'www.facebook.com',
                'www.instagram.com',
                'www.twitter.com',
                'www.youtube.com'
            ];
        }

        /**
         * Adiciona DNS prefetch para domínios externos
         */
        addDNSPrefetch() {
            this.domains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = `//${domain}`;
                document.head.appendChild(link);
            });
        }

        /**
         * Adiciona preconnect para recursos críticos
         */
        addPreconnect() {
            const criticalDomains = [
                'fonts.googleapis.com',
                'fonts.gstatic.com',
                'cdnjs.cloudflare.com'
            ];

            criticalDomains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = `https://${domain}`;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        }
    }

    /**
     * Cache Manager
     */
    class CacheManager {
        constructor() {
            this.cacheConfig = PERFORMANCE_CONFIG.cache;
        }

        /**
         * Define headers de cache via meta tags
         */
        setCacheHeaders() {
            // Adiciona meta tags para cache
            const cacheMeta = document.createElement('meta');
            cacheMeta.httpEquiv = 'Cache-Control';
            cacheMeta.content = `public, max-age=${this.cacheConfig.maxAge}, stale-while-revalidate=${this.cacheConfig.staleWhileRevalidate}`;
            document.head.appendChild(cacheMeta);

            // Adiciona meta tag para ETag
            const etagMeta = document.createElement('meta');
            etagMeta.httpEquiv = 'ETag';
            etagMeta.content = `"${this.generateETag()}"`;
            document.head.appendChild(etagMeta);
        }

        /**
         * Gera ETag simples baseado no timestamp
         */
        generateETag() {
            return Date.now().toString(36);
        }

        /**
         * Configura cache para recursos específicos
         */
        setResourceCache(resourceUrl, maxAge = 86400) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resourceUrl;
            link.as = this.getResourceType(resourceUrl);
            link.setAttribute('data-cache', `max-age=${maxAge}`);
            document.head.appendChild(link);
        }

        /**
         * Determina o tipo de recurso baseado na URL
         */
        getResourceType(url) {
            if (url.match(/\.css$/)) return 'style';
            if (url.match(/\.js$/)) return 'script';
            if (url.match(/\.(woff2?|ttf|eot)$/)) return 'font';
            if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
            return 'fetch';
        }
    }

    /**
     * Error Handler
     */
    class ErrorHandler {
        constructor() {
            this.errorCount = 0;
            this.maxErrors = 5;
        }

        /**
         * Configura tratamento de erros para recursos externos
         */
        setupErrorHandling() {
            // Intercepta erros de carregamento de recursos
            this.interceptResourceErrors();
            
            // Adiciona listener para erros globais
            window.addEventListener('error', (event) => {
                this.handleError(event.error || event.message, event.filename, event.lineno);
            });

            // Adiciona listener para promises rejeitadas
            window.addEventListener('unhandledrejection', (event) => {
                this.handleError(event.reason, 'Promise', 0);
            });
        }

        /**
         * Intercepta erros de carregamento de recursos
         */
        interceptResourceErrors() {
            const originalCreateElement = document.createElement;
            
            document.createElement = function(tagName) {
                const element = originalCreateElement.call(document, tagName);
                
                if (tagName.toLowerCase() === 'script' || tagName.toLowerCase() === 'link') {
                    element.addEventListener('error', (event) => {
                        console.error(`Failed to load resource: ${element.src || element.href}`);
                        
                        // Tenta fallback se disponível
                        if (element.dataset.fallback) {
                            this.loadFallback(element, element.dataset.fallback);
                        }
                    });
                }
                
                return element;
            }.bind(this);
        }

        /**
         * Carrega fallback para recurso que falhou
         */
        loadFallback(failedElement, fallbackUrl) {
            console.log(`Loading fallback: ${fallbackUrl}`);
            
            const fallbackElement = document.createElement(failedElement.tagName.toLowerCase());
            
            if (failedElement.tagName.toLowerCase() === 'script') {
                fallbackElement.src = fallbackUrl;
            } else if (failedElement.tagName.toLowerCase() === 'link') {
                fallbackElement.href = fallbackUrl;
                fallbackElement.rel = failedElement.rel;
            }
            
            failedElement.parentNode.replaceChild(fallbackElement, failedElement);
        }

        /**
         * Trata erros de forma centralizada
         */
        handleError(error, filename, lineno) {
            this.errorCount++;
            
            console.error('Performance Error:', {
                message: error,
                filename: filename,
                line: lineno,
                timestamp: new Date().toISOString(),
                errorCount: this.errorCount
            });

            // Envia erro para analytics se disponível
            if (window.gtag && this.errorCount <= this.maxErrors) {
                window.gtag('event', 'exception', {
                    description: error,
                    fatal: false
                });
            }

            // Log adicional para erros críticos
            if (this.errorCount > this.maxErrors) {
                console.warn('Too many errors detected, reducing logging');
            }
        }
    }

    /**
     * CDN Fallback Manager
     */
    class CDNFallback {
        constructor() {
            this.config = PERFORMANCE_CONFIG.externalResources;
            this.timeouts = PERFORMANCE_CONFIG.timeouts;
        }

        /**
         * Configura fallbacks para CDNs
         */
        setupFallbacks() {
            // Configura fallback para Font Awesome
            this.setupFontAwesomeFallback();
            
            // Configura fallback para Google Fonts
            this.setupGoogleFontsFallback();
            
            // Configura fallback para analytics
            this.setupAnalyticsFallback();
        }

        /**
         * Configura fallback para Font Awesome
         */
        setupFontAwesomeFallback() {
            const fontAwesomeLinks = document.querySelectorAll('link[href*="font-awesome"]');
            
            fontAwesomeLinks.forEach(link => {
                link.dataset.fallback = link.href.replace(
                    this.config.icons.primary,
                    this.config.icons.fallback
                );
                
                // Adiciona timeout para fallback
                setTimeout(() => {
                    if (!link.sheet && !link.href.includes('fallback')) {
                        this.loadFallback(link, link.dataset.fallback);
                    }
                }, this.timeouts.resourceLoad);
            });
        }

        /**
         * Configura fallback para Google Fonts
         */
        setupGoogleFontsFallback() {
            const googleFontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
            
            googleFontLinks.forEach(link => {
                link.dataset.fallback = link.href.replace(
                    this.config.fonts.primary,
                    this.config.fonts.fallback
                );
            });
        }

        /**
         * Configura fallback para analytics
         */
        setupAnalyticsFallback() {
            const analyticsScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
            
            analyticsScripts.forEach(script => {
                script.dataset.fallback = script.src.replace(
                    this.config.analytics.primary,
                    this.config.analytics.fallback
                );
            });
        }

        /**
         * Carrega fallback para um elemento
         */
        loadFallback(element, fallbackUrl) {
            const newElement = document.createElement(element.tagName.toLowerCase());
            
            // Copia atributos relevantes
            Array.from(element.attributes).forEach(attr => {
                if (attr.name !== 'data-fallback') {
                    newElement.setAttribute(attr.name, attr.value);
                }
            });
            
            // Define nova URL
            if (element.tagName.toLowerCase() === 'script') {
                newElement.src = fallbackUrl;
            } else if (element.tagName.toLowerCase() === 'link') {
                newElement.href = fallbackUrl;
            }
            
            // Substitui elemento
            element.parentNode.replaceChild(newElement, element);
            
            console.log(`Fallback loaded: ${fallbackUrl}`);
        }

        /**
         * Testa conectividade com CDN
         */
        async testCDNConnectivity(cdnUrl) {
            try {
                const startTime = performance.now();
                const response = await fetch(cdnUrl, { 
                    method: 'HEAD',
                    mode: 'no-cors'
                });
                const endTime = performance.now();
                
                return {
                    available: true,
                    responseTime: endTime - startTime
                };
            } catch (error) {
                return {
                    available: false,
                    error: error.message
                };
            }
        }
    }

    /**
     * Utilitários de Performance
     */
    class PerformanceUtils {
        /**
         * Mede tempo de carregamento da página
         */
        static measurePageLoadTime() {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                return {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    total: navigation.loadEventEnd - navigation.fetchStart
                };
            }
            return null;
        }

        /**
         * Otimiza imagens com lazy loading
         */
        static optimizeImages() {
            const images = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            } else {
                // Fallback para navegadores sem IntersectionObserver
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                });
            }
        }

        /**
         * Preloada recursos críticos
         */
        static preloadCriticalResources() {
            const criticalResources = [
                '/css/theme.min.css',
                '/js/theme.min.js'
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.css') ? 'style' : 'script';
                document.head.appendChild(link);
            });
        }
    }

    // Inicializa o módulo quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new PerformanceManager();
        });
    } else {
        new PerformanceManager();
    }

    // Expõe utilitários globalmente
    window.PerformanceUtils = PerformanceUtils;

})(); 