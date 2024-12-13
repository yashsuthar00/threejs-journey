import React from 'react'
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Cube = ({ position, size, color }) => {
    const ref = useRef();
    // useFrame((state, delta) => {
    //     ref.current.rotation.x += delta;
    //     ref.current.rotation.y += delta * 2;
    //     ref.current.position.z = Math.sin(state.clock.elapsedTime) * 4;
    //     // console.log(delta);
    //     // console.log(state.clock.elapsedTime);
    //     // console.log(state);
    // });
    return (
        <mesh position={position} ref={ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
        </mesh>
    );
};

export default Cube
