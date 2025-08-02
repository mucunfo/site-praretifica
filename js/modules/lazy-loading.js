/**
 * Lazy Loading System
 * Implementa lazy loading de imagens com Intersection Observer API
 * Inclui fallback para navegadores antigos e placeholder com blur effect
 */

(function() {
    'use strict';

    // Configurações
    const CONFIG = {
        threshold: 0.1,
        rootMargin: '50px',
        placeholderClass: 'lazy-placeholder',
        loadedClass: 'lazy-loaded',
        loadingClass: 'lazy-loading',
        errorClass: 'lazy-error',
        blurClass: 'lazy-blur',
        fadeInClass: 'lazy-fade-in'
    };

    // Verificar suporte ao Intersection Observer
    const supportsIntersectionObserver = 'IntersectionObserver' in window;

    class LazyLoading {
        constructor() {
            this.images = [];
            this.observer = null;
            this.fallbackTimer = null;
            this.init();
        }

        init() {
            // Aguardar DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            // Adicionar loading="lazy" a todas as imagens que não têm
            this.addLazyAttribute();
            
            // Processar imagens existentes
            this.processImages();
            
            // Observar mudanças no DOM para novas imagens
            this.observeDOMChanges();
            
            // Inicializar observer ou fallback
            if (supportsIntersectionObserver) {
                this.initIntersectionObserver();
            } else {
                this.initFallback();
            }
        }

        addLazyAttribute() {
            const images = document.querySelectorAll('img:not([loading])');
            images.forEach(img => {
                // Não adicionar loading="lazy" em imagens acima do fold
                if (!this.isAboveTheFold(img)) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        }

        isAboveTheFold(element) {
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        }

        processImages() {
            const images = document.querySelectorAll('img[loading="lazy"], img.lazy, img[data-lazy]');
            
            images.forEach(img => {
                if (!img.classList.contains(CONFIG.loadedClass) && 
                    !img.classList.contains(CONFIG.loadingClass)) {
                    
                    this.setupImage(img);
                    this.images.push(img);
                }
            });
        }

        setupImage(img) {
            // Adicionar classes de estado
            img.classList.add(CONFIG.loadingClass);
            
            // Criar placeholder se não existir
            if (!img.parentNode.querySelector('.' + CONFIG.placeholderClass)) {
                this.createPlaceholder(img);
            }
            
            // Configurar atributos de dados
            this.setupImageData(img);
        }

        createPlaceholder(img) {
            const wrapper = document.createElement('div');
            wrapper.className = CONFIG.placeholderClass;
            wrapper.style.cssText = `
                position: relative;
                display: inline-block;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                overflow: hidden;
            `;

            // Manter dimensões da imagem original
            if (img.width) wrapper.style.width = img.width + 'px';
            if (img.height) wrapper.style.height = img.height + 'px';
            
            // Aplicar blur effect
            wrapper.classList.add(CONFIG.blurClass);
            
            // Inserir wrapper antes da imagem
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            
            // Adicionar CSS para animação shimmer
            this.addShimmerCSS();
        }

        addShimmerCSS() {
            if (!document.getElementById('lazy-loading-styles')) {
                const style = document.createElement('style');
                style.id = 'lazy-loading-styles';
                style.textContent = `
                    @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                    
                    .${CONFIG.placeholderClass} {
                        position: relative;
                        display: inline-block;
                        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                        background-size: 200% 100%;
                        animation: shimmer 1.5s infinite;
                        overflow: hidden;
                    }
                    
                    .${CONFIG.blurClass} {
                        filter: blur(5px);
                        transition: filter 0.3s ease;
                    }
                    
                    .${CONFIG.loadedClass} {
                        filter: blur(0);
                    }
                    
                    .${CONFIG.fadeInClass} {
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .${CONFIG.fadeInClass}.${CONFIG.loadedClass} {
                        opacity: 1;
                    }
                    
                    .${CONFIG.errorClass} {
                        background: #f8f9fa;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #6c757d;
                        font-size: 12px;
                        text-align: center;
                    }
                `;
                document.head.appendChild(style);
            }
        }

        setupImageData(img) {
            // Se tem data-lazy, usar como src
            if (img.hasAttribute('data-lazy')) {
                img.dataset.originalSrc = img.getAttribute('data-lazy');
                img.src = this.getPlaceholderSrc(img);
            }
            // Se tem data-original, usar como src
            else if (img.hasAttribute('data-original')) {
                img.dataset.originalSrc = img.getAttribute('data-original');
                img.src = this.getPlaceholderSrc(img);
            }
            // Se tem src mas é uma imagem real, manter
            else if (img.src && !img.src.includes('data:image') && !img.src.includes('placeholder')) {
                img.dataset.originalSrc = img.src;
                img.src = this.getPlaceholderSrc(img);
            }
        }

        getPlaceholderSrc(img) {
            // Usar SVG placeholder baseado nas dimensões
            const width = img.width || 300;
            const height = img.height || 200;
            
            return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23999'%3ECarregando...%3C/text%3E%3C/svg%3E`;
        }

        initIntersectionObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: CONFIG.threshold,
                rootMargin: CONFIG.rootMargin
            });

            // Observar todas as imagens
            this.images.forEach(img => {
                this.observer.observe(img);
            });
        }

        initFallback() {
            // Fallback para navegadores antigos
            this.fallbackTimer = setInterval(() => {
                this.images.forEach(img => {
                    if (this.isInViewport(img)) {
                        this.loadImage(img);
                        this.images = this.images.filter(i => i !== img);
                    }
                });
                
                if (this.images.length === 0) {
                    clearInterval(this.fallbackTimer);
                }
            }, 100);
        }

        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        loadImage(img) {
            if (!img.dataset.originalSrc) return;

            const originalSrc = img.dataset.originalSrc;
            
            // Criar nova imagem para testar carregamento
            const tempImg = new Image();
            
            tempImg.onload = () => {
                this.onImageLoad(img, originalSrc);
            };
            
            tempImg.onerror = () => {
                this.onImageError(img);
            };
            
            tempImg.src = originalSrc;
        }

        onImageLoad(img, src) {
            // Atualizar src da imagem
            img.src = src;
            
            // Remover classes de loading
            img.classList.remove(CONFIG.loadingClass);
            img.classList.add(CONFIG.loadedClass);
            
            // Remover blur effect
            const placeholder = img.closest('.' + CONFIG.placeholderClass);
            if (placeholder) {
                placeholder.classList.remove(CONFIG.blurClass);
                placeholder.classList.add(CONFIG.fadeInClass);
                
                // Remover placeholder após transição
                setTimeout(() => {
                    if (placeholder.parentNode) {
                        placeholder.parentNode.insertBefore(img, placeholder);
                        placeholder.remove();
                    }
                }, 300);
            }
            
            // Disparar evento customizado
            this.dispatchEvent('lazyLoaded', { image: img, src: src });
        }

        onImageError(img) {
            img.classList.remove(CONFIG.loadingClass);
            img.classList.add(CONFIG.errorClass);
            
            // Mostrar imagem de erro
            img.src = this.getErrorPlaceholderSrc(img);
            
            // Disparar evento customizado
            this.dispatchEvent('lazyError', { image: img });
        }

        getErrorPlaceholderSrc(img) {
            const width = img.width || 300;
            const height = img.height || 200;
            
            return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23f8f9fa'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%236c757d'%3EImagem não encontrada%3C/text%3E%3C/svg%3E`;
        }

        observeDOMChanges() {
            // Observar mudanças no DOM para novas imagens
            const observer = new MutationObserver((mutations) => {
                let shouldProcess = false;
                
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) { // Element node
                                if (node.tagName === 'IMG' || node.querySelector('img')) {
                                    shouldProcess = true;
                                }
                            }
                        });
                    }
                });
                
                if (shouldProcess) {
                    this.processImages();
                    
                    // Re-observar novas imagens se usando Intersection Observer
                    if (supportsIntersectionObserver && this.observer) {
                        this.images.forEach(img => {
                            if (!img.dataset.observed) {
                                this.observer.observe(img);
                                img.dataset.observed = 'true';
                            }
                        });
                    }
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        dispatchEvent(eventName, detail) {
            const event = new CustomEvent('lazyLoading:' + eventName, {
                detail: detail,
                bubbles: true
            });
            document.dispatchEvent(event);
        }

        // Métodos públicos para controle externo
        refresh() {
            this.processImages();
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
            if (this.fallbackTimer) {
                clearInterval(this.fallbackTimer);
            }
        }
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.lazyLoading = new LazyLoading();
        });
    } else {
        window.lazyLoading = new LazyLoading();
    }

    // Expor para uso global
    window.LazyLoading = LazyLoading;

})(); 