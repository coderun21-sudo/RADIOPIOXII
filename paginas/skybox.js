import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.116.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.116.1/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 0.01;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // append canvas en visor360
  document.getElementById("visor360").appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(360, 60, 60);
  const texture = new THREE.TextureLoader().load('3d.jpg');
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = false;

  window.addEventListener("resize", onWindowResize, false);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
