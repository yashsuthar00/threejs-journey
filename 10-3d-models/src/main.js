import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import GUI from 'lil-gui';

// ...existing code...

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 8);

// Renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

// HDRI Lighting
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/qwantani_patio_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
});

// 3d model loader
const loader = new GLTFLoader();
loader.load('./models/jaguar.glb', function (gltf) {
    gltf.scene.scale.set(30, 30, 30);
    gltf.scene.position.set(-148, -358, 792);
    scene.add(gltf.scene);

    // GUI for model position, scale, and rotation
    const gui = new GUI();
    const modelFolder = gui.addFolder('Model');
    const positionFolder = modelFolder.addFolder('Position');
    positionFolder.add(gltf.scene.position, 'x', -1000, 1000);
    positionFolder.add(gltf.scene.position, 'y', -1000, 1000);
    positionFolder.add(gltf.scene.position, 'z', -1000, 1000);
    const scaleFolder = modelFolder.addFolder('Scale');
    scaleFolder.add(gltf.scene.scale, 'x', 1, 100);
    scaleFolder.add(gltf.scene.scale, 'y', 1, 100);
    scaleFolder.add(gltf.scene.scale, 'z', 1, 100);
    const rotationFolder = modelFolder.addFolder('Rotation');
    rotationFolder.add(gltf.scene.rotation, 'x', 0, Math.PI * 2);
    rotationFolder.add(gltf.scene.rotation, 'y', 0, Math.PI * 2);
    rotationFolder.add(gltf.scene.rotation, 'z', 0, Math.PI * 2);
    modelFolder.close();
});

// handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ...existing code...

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();