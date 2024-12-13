import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import "./App.css";
import { useRef, useState } from "react";
import Torus from "./Components/Torus"
import Cube from "./Components/Cube"
import Sphere from "./Components/Sphere"
import TorusKnot from "./Components/TorusKnot"
import { DirectionalLightHelper } from "three"; 
import { useControls } from "leva";

const Scene = () => {

  const directionalLightRef = useRef();

  const {lightColor, lightIntensity} = useControls({
    lightColor: {value: 'hotpink', label: 'Light Color'},
    lightIntensity: {value: 0.5, min:0, max:5, step: 0.1, label: 'Light Intensity'} 
  })

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'white');

  return (
    <>
      <directionalLight position={[1 , 1, 2]} intensity={lightIntensity} ref={directionalLightRef} color={lightColor}/>
      <ambientLight intensity={0.1} />

      {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color={"orange"} /> */}
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
        <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />
        <Cube position={[-1, 2, 0]} color={"red"} size={[1, 1, 1]} />
        <Cube position={[1, 2, 0]} color={"orange"} size={[1, 1, 1]} />
      </group> */}

      {/* <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={"hotpink"} /> */}

      {/* <Torus position={[3, 0, 0]} size={[1, 0.3, 30, 30]} color={"red"} /> */}

      <TorusKnot position={[0, 0, 0]} size={[0.1, 1000, 50]} color={"hotpink"}  />
      <OrbitControls enableZoom ={true}/>
      <perspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={75}
        near={0.1}
        far={1000}
      />
    </>
  )
}

const App = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default App;
