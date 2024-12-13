import React from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Torus = ({ position, size, color }) => {
    const ref = useRef();
    useFrame((state, delta) => {
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta;
        // ref.current.position.z = Math.sin(state.clock.elapsedTime);
    });

    return (
        <mesh position={position} ref={ref}>
        <torusGeometry args={size} />
        <meshStandardMaterial color={color} wireframe />
        </mesh>
    );
};

export default Torus
