import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple animated water shader
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 4.0 + uTime * 1.5) * 0.15;
    pos.z += sin(pos.y * 6.0 + uTime * 1.2) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  void main() {
    vec3 waterColor = vec3(0.1, 0.9, 0.8);
    float shade = 0.7 + 0.3 * sin(vUv.x * 20.0) * sin(vUv.y * 20.0);
    gl_FragColor = vec4(waterColor * shade, 0.85);
  }
`;

const MemoizedWaterPlane = React.memo(function WaterPlane({ position }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // Memoize geometry and uniforms
  const geometry = useMemo(() => <planeGeometry args={[7, 7, 64, 64]} />, []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  return (
    <mesh
      ref={meshRef}
      position={position || [0, 0, 0]}
      rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
    >
      {geometry}
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        uniforms={uniforms}
      />
    </mesh>
  );
});

const GlobalLiquidScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 50 }}
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
      {/* <MemoizedWaterPlane /> */}
      <MemoizedWaterPlane position={[2, 0, 0]} />
      <MemoizedWaterPlane position={[-4, 0, -2]} />
    </Canvas>
  );
};

export default GlobalLiquidScene;
