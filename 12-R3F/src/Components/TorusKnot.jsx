import React from 'react'
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { useControls } from "leva";

const TorusKnot = ({ position, size }) => {
    const ref = useRef();

    const {color, radius, tube, tubularSegments, radialSegments} = useControls({
        color: {value: 'hotpink', label: 'Color'},
        radius: {value: 5, min:1, max:10, step: 0.5, label: 'Radius'},
        tube: {value: 0.1, min:0, max:5, step: 0.1, label: 'Tube'},
        tubularSegments: {value: 100, min:0, max:100, step: 1, label: 'Tubular Segments'},
        radialSegments: {value: 50, min:0, max:100, step: 1, label: 'Radial Segments'}
    })

    // useFrame((state, delta) => {
    //     ref.current.rotation.x += delta;
    //     ref.current.rotation.y += delta;
    //     // ref.current.position.z = Math.sin(state.clock.elapsedTime);
    // });

    return (
        <mesh position={position} ref={ref}>
        <torusKnotGeometry args={[radius, tube, tubularSegments, radialSegments]} />
        {/* <meshStandardMaterial color={color} wireframe /> */}
        <MeshWobbleMaterial color={color} speed={2} factor={5} radius={radius}/>
        {/* <MeshDistortMaterial color={color} speed={10} distort={0.2} /> */}
        </mesh>
    );
};


export default TorusKnot
