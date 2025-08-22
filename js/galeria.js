document.addEventListener('DOMContentLoaded', function() {
    // Configuración de Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'alwaysShowNavOnTouchDevices': true,
        'albumLabel': 'Imagen %1 de %2',
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'disableScrolling': true
    });
    
    // Filtrado de elementos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item, .audio-item, .doc-item, .video-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Cambiar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar elementos
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Scroll suave a la sección correspondiente
            if (filterValue !== 'all') {
                const section = document.getElementById(filterValue);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Ordenar por año (funcionalidad adicional)
    const sortSelect = document.createElement('select');
    sortSelect.innerHTML = `
        <option value="newest">Más recientes primero</option>
        <option value="oldest">Más antiguos primero</option>
    `;
    sortSelect.classList.add('sort-select');
    
    const filtersContainer = document.querySelector('.gallery-filters');
    filtersContainer.appendChild(sortSelect);
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const itemsContainer = document.querySelector('.gallery-container');
        const items = Array.from(document.querySelectorAll('[data-year]'));
        
        items.sort((a, b) => {
            const yearA = parseInt(a.getAttribute('data-year'));
            const yearB = parseInt(b.getAttribute('data-year'));
            
            return sortValue === 'newest' ? yearB - yearA : yearA - yearB;
        });
        
        // Reorganizar elementos en el DOM
        items.forEach(item => {
            itemsContainer.appendChild(item.parentNode);
        });
    });
    
    // Descargar archivos de audio
    document.querySelectorAll('.audio-meta span:last-child').forEach(downloadBtn => {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const audioItem = this.closest('.audio-item');
            const audioSrc = audioItem.querySelector('audio source').src;
            const fileName = audioSrc.split('/').pop();
            
            // Crear enlace de descarga
            const downloadLink = document.createElement('a');
            downloadLink.href = audioSrc;
            downloadLink.download = fileName;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Feedback al usuario
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Descargado';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
    
    // Cargar más elementos (simulación)
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = 'Cargar más';
    loadMoreBtn.classList.add('load-more-btn');
    document.querySelector('.gallery-container').appendChild(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', function() {
        this.textContent = 'Cargando...';
        this.disabled = true;
        
        // Simular carga AJAX
        setTimeout(() => {
            // En una implementación real, aquí se cargarían más elementos del servidor
            this.textContent = 'No hay más elementos';
            this.style.opacity = '0.5';
        }, 1500);
    });
});