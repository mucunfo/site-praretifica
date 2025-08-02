/**
 * Menu Lateral Module
 * 
 * Funcionalidades para o menu lateral:
 * - Toggle do menu lateral
 * - Filtro de categorias
 * - Expandir/colapsar submenus
 * - Fechar com tecla ESC
 */

// Função para alternar o menu lateral
function toggleMenuLateral() {
    const menu = document.querySelector('.menu-lateral');
    const overlay = document.querySelector('.menu-lateral-overlay');
    const toggle = document.querySelector('.menu-lateral-toggle');
    
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    toggle.classList.toggle('active');
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
}

// Função para filtrar categorias
function filterMenu(value) {
    const items = document.querySelectorAll('.menu-lateral-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const searchValue = value.toLowerCase().trim();
        
        if (searchValue === '') {
            // Se o campo estiver vazio, mostra todos os itens
            item.style.display = '';
        } else {
            // Filtra baseado no texto da categoria
            item.style.display = text.includes(searchValue) ? '' : 'none';
        }
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Expandir submenus
    document.querySelectorAll('.menu-lateral-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('menu-lateral-submenu')) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                submenu.classList.toggle('active');
            }
        });
    });

    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const menu = document.querySelector('.menu-lateral');
            if (menu.classList.contains('active')) {
                toggleMenuLateral();
            }
        }
    });
});

// Exportar funções para uso global
window.toggleMenuLateral = toggleMenuLateral;
window.filterMenu = filterMenu; 