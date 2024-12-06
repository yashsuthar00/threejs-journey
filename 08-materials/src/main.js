import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // import orbit controls
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

const material = new THREE.MeshStandardMaterial( { map: color, roughnessMap: roughness, roughness: 0, metalness: 0.56, normalMap: normal, displacementMap: height, displacementScale: 0 } ); // map : color is to give texture color to mesh

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

// create a directional light with high intensity
const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
highIntensityLight.position.set(10, 20, 15);
scene.add(highIntensityLight);

// studio lighting\

// create a directional light to simulate sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// create an ambient light to provide a base level of illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// create a point light to simulate a light bulb

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// light helper

const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5);
scene.add(highIntensityLightHelper);

const DirectionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(DirectionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
scene.add(pointLightHelper);

const gui = new lil.GUI();
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1, 0.01);
materialFolder.add(material, 'metalness', 0, 1, 0.01);
materialFolder.add(material, 'displacementScale', 0, 1, 0.01);
// materialFolder.add(material, 'color').name('Color');
materialFolder.open();

const cubeFolder = gui.addFolder('Mesh');
cubeFolder.add(cube.scale, 'x', 0.1, 5, 0.1).name('Scale X');
cubeFolder.add(cube.scale, 'y', 0.1, 5, 0.1).name('Scale Y');
cubeFolder.add(cube.scale, 'z', 0.1, 5, 0.1).name('Scale Z');
cubeFolder.addColor(material, 'color').name('Color');
cubeFolder.add(cube.position, 'x', 0.1, 5, 0.1).name('Position X');
cubeFolder.add(cube.position, 'y', 0.1, 5, 0.1).name('Position Y');
cubeFolder.add(cube.position, 'z', 0.1, 5, 0.1).name('Position Z');
cubeFolder.open();

//  responsive
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