import * as THREE from '../web_modules/three.js';
import Stats from '../web_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../web_modules/three/examples/jsm/controls/OrbitControls.js';
import { TGALoader } from '../web_modules/three/examples/jsm/loaders/TGALoader.js';

let camera, scene, renderer, stats, cubes;

init();
animate();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 15);
  //camera.position.z = 5;

  scene = new THREE.Scene();

  //

  //const loader = new TGALoader();
  //const texture = loader.load('textures/crate_grey8.tga');
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
  //const material = new THREE.MeshBasicMaterial({ map: texture });
  const cols = 6;
  const rows = 6;

  cubes = [];
  for (let i = 0; i < cols; i++) {
    const xRow = [];
    for (let j = 0; j < rows; j++) {
      const cellColour = 255 - Math.ceil(255 * Math.random());
      const material = new THREE.MeshBasicMaterial({
        color: `rgb(${cellColour},${cellColour},${cellColour})`,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i;
      cube.position.y = j;

      scene.add(cube);
      xRow.push(cube);
    }
    cubes.push(xRow);
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  //

  stats = new Stats();
  container.appendChild(stats.dom);

  //

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  move(0.01);
  stats.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

function move(speed) {
  var d = cubes[3][3].position.x - cubes[0][0].position.x;
  if (cubes[3][3].position.x > cubes[0][0].position.x) {
    const val = Math.min(speed, d);
    cubes[3][3].position.x -= val;
    cubes[3][3].position.z -= val;
  }
}
