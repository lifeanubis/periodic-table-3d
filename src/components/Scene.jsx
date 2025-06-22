import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function Box() {
  const meshRef = useRef(null);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [1, 1, 1], fov: 75, near: 0.1, far: 1000 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0.1, 1, 1]} intensity={10} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}
