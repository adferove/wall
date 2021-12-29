import * as THREE from '../web_modules/three.js';
import Stats from '../web_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../web_modules/three/examples/jsm/controls/OrbitControls.js';
import { TGALoader } from '../web_modules/three/examples/jsm/loaders/TGALoader.js';

let scene, camera, renderer, cube, cube2, cube3, cube4, cubes;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const texture = new THREE.TextureLoader().load('textures/crate.gif');
  const material = new THREE.MeshBasicMaterial({ map: texture });

  const cols = 6;
  const rows = 6;

  cubes = [];
  for (let i = 0; i < cols; i++) {
    const xRow = [];
    for (let j = 0; j < rows; j++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i;
      cube.position.y = j;
      scene.add(cube);
      xRow.push(cube);
    }
    cubes.push(xRow);
  }
  console.log(cubes);

  camera.position.z = 5;
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

init();
animate();
