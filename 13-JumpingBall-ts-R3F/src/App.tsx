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
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} castShadow />
      <Physics>
        <Ground />
        <Ball />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
}
