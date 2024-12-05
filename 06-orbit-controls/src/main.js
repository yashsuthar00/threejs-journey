import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // import orbit controls

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } ); // wireframe : true to see cube wireframe
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}) // responsive

const controls = new OrbitControls( camera, renderer.domElement ); // declare controls
controls.enableDamping = true; //smooth controls
controls.autoRotate = true; // auto rotate
// controls.enableZoom = false; // prevent zooming

function animate() {
    window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
    controls.update(); // update controls with animation
    
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;    
}
animate();