document.addEventListener('DOMContentLoaded', function() {
    // Control de tema oscuro
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verificar preferencia del usuario
    if (localStorage.getItem('darkTheme') === 'enabled') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('darkTheme', 'enabled');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkTheme', 'disabled');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Control de audio (para futura implementación)
    const audioToggle = document.getElementById('audio-toggle');
    let audioEnabled = false;
    
    audioToggle.addEventListener('click', function() {
        audioEnabled = !audioEnabled;
        
        if (audioEnabled) {
            audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            // Aquí iría la lógica para activar narraciones de audio
        } else {
            audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            // Detener audio
        }
    });
    
    // Animación de scroll para la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    const animateOnScroll = function() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.75) {
                item.classList.add('animate__fadeIn');
            }
        });
    };
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Precarga de elementos importantes
    const images = [
        '../img/fundacion.png',
        '../img/estudios-antiguos.jpg',
        '../img/equipos-vintage.jpeg'
    ];
    
    images.forEach(img => {
        new Image().src = img;
    });
});