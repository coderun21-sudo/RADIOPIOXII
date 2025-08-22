// Variables globales
let scene, camera, renderer, controls, model;

// Inicializar la escena
function init() {
  // 1. Crear la escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);
  
  // 2. Configurar la cámara
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.set(5, 2, 5);
  
  // 3. Configurar el renderizador
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('tour-3d-container').appendChild(renderer.domElement);
  
  // 4. Añadir controles de órbita
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  
  // 5. Añadir luces
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  // 6. Cargar el modelo 3D
  const loader = new THREE.GLTFLoader();
  loader.load(
    'radio.glb', // Asegúrate de que esta ruta es correcta
    function(gltf) {
      model = gltf.scene;
      model.traverse(function(node) {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      scene.add(model);
      
      // Ajustar la cámara para que encuadre el modelo
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      camera.position.copy(center);
      camera.position.x += size.length();
      camera.position.y += size.length() * 0.5;
      camera.position.z += size.length();
      camera.lookAt(center);
      
      controls.target.copy(center);
    },
    undefined,
    function(error) {
      console.error('Error al cargar el modelo:', error);
    }
  );
  
  // 7. Manejar el redimensionamiento de la ventana
  window.addEventListener('resize', onWindowResize);
  
  // 8. Iniciar el bucle de animación
  animate();
}

// Redimensionar la ventana
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Bucle de animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Iniciar todo cuando se cargue la página
window.addEventListener('load', init);

// Funcionalidad de los botones
document.getElementById('free-mode').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('guided-mode').classList.remove('active');
  controls.enabled = true;
});

document.getElementById('guided-mode').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('free-mode').classList.remove('active');
  controls.enabled = false;
  // Aquí iría la lógica para el modo guiado
});

// Hotspots interactivos
document.querySelectorAll('[data-hotspot]').forEach(item => {
  item.addEventListener('click', function() {
    const hotspot = this.getAttribute('data-hotspot');
    showInfoPanel(hotspot);
  });
});

// Mostrar panel de información
function showInfoPanel(hotspot) {
  const panel = document.querySelector('.info-panel');
  panel.classList.remove('hidden');
  
  // Aquí puedes personalizar el contenido según el hotspot
  if (hotspot === 'cabina') {
    document.querySelector('.info-title').textContent = 'Cabina de Transmisión';
    // Más lógica para actualizar contenido...
  }
}

// Cerrar panel de información
document.querySelector('.close-info').addEventListener('click', function() {
  document.querySelector('.info-panel').classList.add('hidden');
});