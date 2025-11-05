import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Crystal: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 2.2 : 2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={hovered ? '#F4F754' : '#E9D8E4'}
        emissive={hovered ? '#F4F754' : '#BFABD4'}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

const Scene3D: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#F4F754" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#BFABD4" />
      <Crystal />
    </>
  );
};

export default Scene3D;