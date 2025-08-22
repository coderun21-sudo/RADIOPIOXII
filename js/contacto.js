document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    const map = L.map('radioMap').setView([-18.4241, -66.5839], 16);
    
    // Añadir capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Añadir marcador personalizado
    const radioIcon = L.icon({
        iconUrl: '../img/map-marker.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
    
    const marker = L.marker([-18.4241, -66.5839], {
        icon: radioIcon,
        title: "Radio Pío XII"
    }).addTo(map);
    
    marker.bindPopup(`
        <strong>Radio Pío XII</strong><br>
        Calle Bolívar #123, Llallagua<br>
        <img src="../img/map-popup.jpg" width="200" alt="Edificio Radio Pío XII">
    `).openPopup();
    
    // Botón "Cómo llegar"
    document.getElementById('openDirections').addEventListener('click', function() {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${marker.getLatLng().lat},${marker.getLatLng().lng}`;
        window.open(url, '_blank');
    });
    
    // Validación del formulario
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor ingrese un correo electrónico válido');
                return;
            }
            
            // Simular envío (en producción sería una petición AJAX)
            alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }
});