import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const RotatingCube = () => {
  const cubeRef = useRef();

  // Animation logic for rotating the cube
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef}>
      {/* Larger Geometry */}
      <boxGeometry args={[2, 2, 2]} />
      {/* Material */}
      <meshBasicMaterial color="green" />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 3], fov: 75 }} 
      style={{ width: '100vw', height: '100vh' }} // Full-screen canvas
    >
      <ambientLight />
      <RotatingCube />
    </Canvas>
  );
};

export default App;
