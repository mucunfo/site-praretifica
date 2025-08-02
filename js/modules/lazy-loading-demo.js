/**
 * Lazy Loading Demo Module
 * 
 * Funcionalidades para demonstração do lazy loading:
 * - Contadores de eventos
 * - Funções de controle
 * - Adição dinâmica de imagens
 */

// Contadores para eventos
let loadedCount = 0;
let errorCount = 0;

// Atualizar status
function updateStatus() {
    document.getElementById('status').innerHTML = `
        Status: ${loadedCount} imagens carregadas, ${errorCount} erros
        <br>Intersection Observer: ${'IntersectionObserver' in window ? 'Suportado' : 'Fallback'}
    `;
}

// Event listeners para lazy loading
document.addEventListener('lazyLoading:lazyLoaded', (event) => {
    loadedCount++;
    updateStatus();
    console.log('✅ Imagem carregada:', event.detail.src);
});

document.addEventListener('lazyLoading:lazyError', (event) => {
    errorCount++;
    updateStatus();
    console.log('❌ Erro ao carregar imagem:', event.detail.image);
});

// Funções dos controles
function refreshLazyLoading() {
    if (window.lazyLoading) {
        window.lazyLoading.refresh();
        console.log('🔄 Lazy loading atualizado');
    }
}

function destroyLazyLoading() {
    if (window.lazyLoading) {
        window.lazyLoading.destroy();
        console.log('🗑️ Lazy loading destruído');
    }
}

function addNewImages() {
    const container = document.getElementById('dynamic-images');
    const newIndex = container.children.length + 10;
    
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.innerHTML = `
        <img data-lazy="https://picsum.photos/300/200?random=${newIndex}" 
             alt="Imagem Dinâmica ${newIndex}" 
             loading="lazy"
             width="300" 
             height="200">
        <p>Imagem Dinâmica ${newIndex}</p>
    `;
    
    container.appendChild(imageItem);
    console.log('➕ Nova imagem adicionada');
    
    // Refresh lazy loading para processar nova imagem
    setTimeout(refreshLazyLoading, 100);
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// Inicializar status
updateStatus();

// Log quando o sistema estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema de lazy loading carregado');
    if (window.lazyLoading) {
        console.log('✅ Instância global disponível: window.lazyLoading');
    }
});

// Exportar funções para uso global
window.refreshLazyLoading = refreshLazyLoading;
window.destroyLazyLoading = destroyLazyLoading;
window.addNewImages = addNewImages;
window.scrollToBottom = scrollToBottom; 