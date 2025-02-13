import { Canvas } from "@react-three/fiber";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import "./App.css";

function Ground() {
  const [ref] = useBox(() => ({
    args: [10, 1, 10], // Width, Height, Depth
    position: [0, -0.5, 0],
    type: "Static",
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function Ball() {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 2, 0],
    args: [0.5],
    restitution: 0.8, // Bounciness (0 = no bounce, 1 = max bounce)
    linearDamping: 0.1, // Slows down motion over time
    angularDamping: 0.1, // Reduces ball spinning over time
  }));

  return (
    <mesh
      ref={ref}
      onClick={() => api.velocity.set(0, 5, 0)} // Ball jumps when clicked
      castShadow
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      {/* Directional Light with Shadows */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
      />

      <Physics>
        <Ground />
        <Ball />
      </Physics>

      <OrbitControls />
    </Canvas>
  );
}
