import React from 'react'
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Sphere = ({ position, size, color }) => {
    const ref = useRef();
    useFrame((state, delta) => {
        const speed = hovered ? 5 : 1;
        ref.current.rotation.x += delta * speed;
        ref.current.rotation.y += delta;
        // ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    });

    const [hovered, setHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    return (
        <mesh
        position={position}
        ref={ref}
        onPointerEnter={(event) => (event.stopPropagation(), setHovered(true))}
        onPointerLeave={() => setHovered(false)}
        onClick={() => setIsClicked(!isClicked)}
        scale={isClicked ? 1.5 : 1}
        >
        <sphereGeometry args={size} />
        <meshStandardMaterial color={hovered ? "orange" : "hotpink"} wireframe />
        </mesh>
    );
};

export default Sphere
