import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // import orbit controls
import * as lil from 'lil-gui'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Texture
let loader = new THREE.TextureLoader();
let color = loader.load("./textures/color.jpg")
let roughness = loader.load("./textures/roughness.jpg")
let normal = loader.load("./textures/normal.png")
let height = loader.load("./textures/height.png")

const geometry = new THREE.BoxGeometry( 3, 1.8, 2 );  
// const material = new THREE.MeshStandardMaterial( { color : "red", roughness: 0.3, metalness: 0.8 } );

const material = new THREE.MeshStandardMaterial( { map: color, roughnessMap: roughness, roughness: 0.41, metalness: 0.89, normalMap: normal, displacementMap: height, displacementScale: 0 } ); // map : color is to give texture color to mesh

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

// lights

// ambient light
const ambient = new THREE.AmbientLight( "0xffffff", 1.32 ); 
scene.add( ambient );

// directional light
const directional = new THREE.DirectionalLight( "0xffffff", 10 ); 
directional.position.set( 0.65, 2, 2 );
scene.add( directional );

const helper = new THREE.DirectionalLightHelper( directional, 1 );
scene.add( helper );

// point light
const point = new THREE.PointLight( "0xffffff", 2.25, 100, 2 );
point.position.set( -1, -1.52, -0.74 );
scene.add( point );

const sphereSize = 0.5;
const pointLightHelper = new THREE.PointLightHelper( point, sphereSize );
scene.add( pointLightHelper );

// Light bulb geometry and material
const bulbGeometry = new THREE.SphereGeometry(0.1, 16, 8);
const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// Ambient light bulb
const ambientBulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
ambientBulb.position.set(0, 0, 0); // Position it at the center
scene.add(ambientBulb);

// Directional light bulb
const directionalBulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
directionalBulb.position.copy(directional.position);
scene.add(directionalBulb);

// Point light bulb
const pointBulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
pointBulb.position.copy(point.position);
scene.add(pointBulb);

// lil gui
const gui = new lil.GUI();
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1, 0.01);
materialFolder.add(material, 'metalness', 0, 1, 0.01);
materialFolder.add(material, 'displacementScale', 0, 1, 0.01);
// materialFolder.add(material, 'color').name('Color');
materialFolder.close();

const cubeFolder = gui.addFolder('Mesh');
cubeFolder.add(cube.scale, 'x', 0.1, 5, 0.1).name('Scale X');
cubeFolder.add(cube.scale, 'y', 0.1, 5, 0.1).name('Scale Y');
cubeFolder.add(cube.scale, 'z', 0.1, 5, 0.1).name('Scale Z');
cubeFolder.addColor(material, 'color').name('Color');
cubeFolder.add(cube.position, 'x', 0.1, 5, 0.1).name('Position X');
cubeFolder.add(cube.position, 'y', 0.1, 5, 0.1).name('Position Y');
cubeFolder.add(cube.position, 'z', 0.1, 5, 0.1).name('Position Z');
cubeFolder.close();

// Light settings folder
const lightFolder = gui.addFolder('Lights');

// Ambient light settings
const ambientFolder = lightFolder.addFolder('Ambient Light');
ambientFolder.add(ambient, 'intensity', 0, 1, 0.01);
ambientFolder.open();

// Directional light settings
const directionalFolder = lightFolder.addFolder('Directional Light');
directionalFolder.add(directional, 'intensity', 0, 1, 0.01);
directionalFolder.add(directional.position, 'x', -10, 10, 0.1).name('Position X');
directionalFolder.add(directional.position, 'y', -10, 10, 0.1).name('Position Y');
directionalFolder.add(directional.position, 'z', -10, 10, 0.1).name('Position Z');
directionalFolder.open();

// Point light settings
const pointFolder = lightFolder.addFolder('Point Light');
pointFolder.add(point, 'intensity', 0, 1, 0.01);
pointFolder.add(point.position, 'x', -10, 10, 0.1).name('Position X');
pointFolder.add(point.position, 'y', -10, 10, 0.1).name('Position Y');
pointFolder.add(point.position, 'z', -10, 10, 0.1).name('Position Z');
pointFolder.open();

lightFolder.open();

//  responsive
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const controls = new OrbitControls( camera, renderer.domElement ); // declare controls
controls.enableDamping = true; //smooth controls
controls.autoRotate = false; // auto rotate
// controls.enableZoom = false; // prevent zooming

function animate() {
  window.requestAnimationFrame(animate);
  
  // Update light bulb positions
  directionalBulb.position.copy(directional.position);
  pointBulb.position.copy(point.position);

  renderer.render(scene, camera);
  controls.update();
}
animate();