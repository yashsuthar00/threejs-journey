import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef } from "react";

const Cube = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta * 2;
    ref.current.position.z += delta;
    // console.log(delta);
    // console.log(state);
  });
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} intensity={0.5} />
      <ambientLight intensity={0.1} />

      <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"orange"} />
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
        <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />
        <Cube position={[-1, 2, 0]} color={"red"} size={[1, 1, 1]} />
        <Cube position={[1, 2, 0]} color={"orange"} size={[1, 1, 1]} />
      </group> */}
    </Canvas>
  );
};

export default App;
