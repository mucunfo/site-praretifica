/**
 * Sidebar Filters Module
 * 
 * Funcionalidades para filtros da sidebar:
 * - Tornar grupos de filtros colapsáveis
 * - Contador de filtros aplicados
 * - Feedback visual ao aplicar filtros
 */

document.addEventListener('DOMContentLoaded', function() {
    // Colapsar/expandir grupos de filtros
    const filterTitles = document.querySelectorAll('.filter-title');
    filterTitles.forEach(title => {
        title.addEventListener('click', function() {
            const group = this.closest('.filter-group');
            group.classList.toggle('collapsed');
            
            const content = this.nextElementSibling;
            if (content) {
                content.style.display = group.classList.contains('collapsed') ? 'none' : 'block';
            }
        });
    });
    
    // Contador de filtros aplicados
    const checkboxes = document.querySelectorAll('.smart-filter input[type="checkbox"]');
    function updateFilterCount() {
        const checked = document.querySelectorAll('.smart-filter input[type="checkbox"]:checked').length;
        const filterButton = document.querySelector('.btn-filter');
        if (filterButton && checked > 0) {
            filterButton.textContent = `Aplicar Filtros (${checked})`;
        } else if (filterButton) {
            filterButton.textContent = 'Aplicar Filtros';
        }
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilterCount);
    });
    
    // Feedback visual ao aplicar filtros
    const filterButton = document.querySelector('.btn-filter');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            this.innerHTML = '<span class="loading-spinner"></span> Aplicando...';
            this.disabled = true;
        });
    }
}); 