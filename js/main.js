import * as THREE from '../web_modules/three.js';
import Stats from '../web_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../web_modules/three/examples/jsm/controls/OrbitControls.js';
import { TGALoader } from '../web_modules/three/examples/jsm/loaders/TGALoader.js';

let camera, scene, renderer, stats, cubes;
let x1 = 5,
  y1 = 5,
  x2 = 0,
  y2 = 0;
let next = false;
const cube_values = [0, 1, 2, 3, 4, 5];

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
  camera.position.set(10, 5, -10);
  //camera.position.z = 5;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0000ff);
  //

  //const loader = new TGALoader();
  //const texture = loader.load('textures/crate_grey8.tga');
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
  //const material = new THREE.MeshBasicMaterial({ map: texture });
  const cols = 6;
  const rows = 6;

  cubes = [];
  let pos = 0;
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
      cube.initial_pos_x = i;
      cube.initial_pos_y = j;
      cube.bubble_value = cellColour;
      cube.pos = pos;
      pos++;
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
  move(0.5);
  stats.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

function move(speed) {
  if (
    cubes[x1][y1].bubble_value !== undefined &&
    cubes[x2][y2].bubble_value !== undefined &&
    cubes[x1][y1].bubble_value > cubes[x2][y2].bubble_value &&
    cubes[x1][y1].pos > cubes[x2][y2].pos
  ) {
    next = false;
    const dx = cubes[x1][y1].position.x - cubes[x2][y2].initial_pos_x;
    const dy = cubes[x1][y1].position.y - cubes[x2][y2].initial_pos_y;
    if (dx !== 0 || dy !== 0) {
      const dz = 2 + cubes[x1][y1].position.z;
      const valX = Math.min(speed, dx);
      const valY = Math.min(speed, dy);
      const valZ = Math.min(speed, dz);

      cubes[x1][y1].position.z -= valZ;
      cubes[x2][y2].position.z -= valZ;
      if (cubes[x1][y1].position.z === -2) {
        cubes[x1][y1].position.x -= valX;
        cubes[x2][y2].position.x += valX;
        cubes[x1][y1].position.y -= valY;
        cubes[x2][y2].position.y += valY;
      }
    }

    if (dx === 0 && dy === 0) {
      const dzb = cubes[x1][y1].position.z * -1;
      let valZb = Math.abs(Math.min(speed, dzb));
      cubes[x1][y1].position.z += valZb;
      cubes[x2][y2].position.z += valZb;

      if (valZb === 0) {
        next = true;
        let pos1 = cubes[x1][y1].pos;
        let pos2 = cubes[x2][y2].pos;
        cubes[x1][y1].pos = pos2;
        cubes[x2][y2].pos = pos1;
        cubes[x1][y1].initial_pos_x = cubes[x1][y1].position.x;
        cubes[x1][y1].initial_pos_y = cubes[x1][y1].position.y;
        cubes[x2][y2].initial_pos_x = cubes[x2][y2].position.x;
        cubes[x2][y2].initial_pos_y = cubes[x2][y2].position.y;
      }
    }
    if (next) {
      x1 = Math.floor(Math.random() * cube_values.length);
      y1 = Math.floor(Math.random() * cube_values.length);
      x2 = Math.floor(Math.random() * cube_values.length);
      y2 = Math.floor(Math.random() * cube_values.length);
    }
  } else {
    x1 = Math.floor(Math.random() * cube_values.length);
    y1 = Math.floor(Math.random() * cube_values.length);
    x2 = Math.floor(Math.random() * cube_values.length);
    y2 = Math.floor(Math.random() * cube_values.length);
  }
}
