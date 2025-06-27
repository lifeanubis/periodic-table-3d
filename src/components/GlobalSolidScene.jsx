import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Icosahedrons() {
  const meshRef = useRef([]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.forEach((mesh) => {
        mesh.rotation.y = clock.getElapsedTime() / 2;
      });
    }
  });
  // Example positions for multiple icosahedrons
  const positions = [
    [0, 0, 0],
    [-8, 0, 0],
    [8, -5, 0],
    [-7, -3.5, 0],
    [2, 2, 2],
    [-2, -2, -2],
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos} ref={(el) => (meshRef.current[i] = el)}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={`hsl(${i * 50}, 80%, 60%)`}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

const GlobalSolidScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Icosahedrons />
      <OrbitControls />
    </Canvas>
  );
};

export default GlobalSolidScene;
