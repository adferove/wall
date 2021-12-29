import * as THREE from '../web_modules/three.js';
import Stats from '../web_modules/three/examples/jsm/libs/stats.module.js';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var camera, scene, renderer, mesh, mesh2, controls, stats;

init();
animate();
function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, -50, 50);
  camera.lookAt(0, 0, 0);
  scene = new THREE.Scene();
  var ambient = new THREE.AmbientLight(0x000000, 0.3);
  scene.add(ambient);
  var light = new THREE.PointLight(0xffffff, 0.6, 200);
  light.position.set(10, 10, 100);
  light.castShadow = true;
  scene.add(light);

  /*controls = new THREE.OrbitControls( camera );
 controls.enableKeys = false;
 controls.update();*/

  var geometryPlane = new THREE.PlaneGeometry(300, 300);
  var materialPlane = new THREE.MeshPhongMaterial({ color: 0xcccccc });
  var plane = new THREE.Mesh(geometryPlane, materialPlane);
  //plane.rotation.x = -Math.PI/2;
  plane.receiveShadow = true;
  scene.add(plane);

  var geometry = new THREE.BoxGeometry(5, 5, 5);
  var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = 2.5;
  mesh.castShadow = true;
  mesh.position.x = 0;
  scene.add(mesh);

  var geometry2 = new THREE.BoxGeometry(5, 5, 1);
  var material2 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.z = 0;
  mesh2.position.x = -20;
  mesh2.castShadow = true;
  scene.add(mesh2);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  stats = new Stats();
  document.body.appendChild(stats.dom);
  document.body.appendChild(renderer.domElement);
  //////////////////////////////////////////////////////////
}

function move(speed) {
  var d = mesh.position.x - mesh2.position.x;
  if (mesh.position.x > mesh2.position.x) {
    mesh.position.x -= Math.min(speed, d);
  }
}

function animate() {
  requestAnimationFrame(animate);

  move(0.01);

  stats.update();
  renderer.render(scene, camera);
}
