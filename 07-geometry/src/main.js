import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // import orbit controls

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const geometry = new THREE.SphereGeometry( 1, 10, 10 ); 
const geometry = new THREE.CylinderGeometry( 2, 2, 3, 10, 2, true ); 
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide} ); // to render geometry on double side
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const controls = new OrbitControls( camera, renderer.domElement ); // declare controls
controls.enableDamping = true; //smooth controls
controls.autoRotate = true; // auto rotate
// controls.enableZoom = false; // prevent zooming

function animate() {
  window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
  controls.update();
}
animate();