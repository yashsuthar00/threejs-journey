// 1. Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,                                  // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,                                 // Near clipping plane
  1000                                 // Far clipping plane
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Add renderer to the HTML document

// 2. Create a geometry (cube) and a material
const geometry = new THREE.BoxGeometry(1, 1, 1); // Cube with dimensions 1x1x1
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color material
const cube = new THREE.Mesh(geometry, material); // Combine geometry and material
scene.add(cube); // Add cube to the scene

// 3. Position the camera
camera.position.z = 5;  

// 4. Animation loop
function animate() {
  requestAnimationFrame(animate); // Schedule the next frame

  cube.rotation.x += 0.01; // Rotate the cube on the X-axis
  cube.rotation.y += 0.01; // Rotate the cube on the Y-axis

  renderer.render(scene, camera); // Render the scene from the camera's perspective
}

// 5. Start the animation loop
animate();
