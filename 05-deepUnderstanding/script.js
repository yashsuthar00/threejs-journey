let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5; // camera position on z axis
scene.add(camera);

let box = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshBasicMaterial({color: "red"});
let mesh = new THREE.Mesh(box, material);

// mesh.position.x = 2; // mesh position on x axis (left <--> Right)
// mesh.position.y = -1; // mesh position on y axis (Up || Down)
// mesh.position.z = 1; // mesh position on z axis (on z axis close and far away)

// mesh.rotation.x = 1.2; // mesh rotation on x axis
// mesh.rotation.y = 1.4; // mesh rotation on y axis
// mesh.rotation.z = 1.3; // mesh rotation on z axis

// mesh.rotation.y = Math.PI // 180 degree rotation
// mesh.rotation.y = Math.PI / 2 // 90 degree rotation
// mesh.rotation.y = Math.PI / 4 // 45 degree rotation
// mesh.rotation.y = Math.PI * 2 // 360 degree rotation

// mesh.scale.x = 1.5; // mesh scale on x axis
// mesh.scale.y = 2; // mesh scale on y axis
// mesh.scale.z = 0.5; // mesh scale on z axis

scene.add(mesh);

const canvas = document.querySelector('canvas');
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias : true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

let clock = new THREE.Clock();
function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.rotation.y = clock.getElapsedTime()*100;
    // mesh.rotation.x += 0.01;
    // mesh.rotation.z += 0.01;
    
}
animate();