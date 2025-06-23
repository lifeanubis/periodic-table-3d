import { Canvas } from '@react-three/fiber';
import { Text, OrbitControls, MeshPortalMaterial } from '@react-three/drei';
import { useState } from 'react';
import OrbitingSpheres from './OrbitScene';
import * as THREE from 'three';
import { useTheme } from '../theme/ThemeContext';

function Card({ position, children, theme }) {
  const cardBG = theme.background;
  const cardTextTop = theme.text_3;

  return (
    <group position={position}>
      {/* Red card background */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[10, 10, 1]} />
        <meshBasicMaterial side={2} color={cardBG} />
      </mesh>
      {/* Portal effect overlays on top */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[10, 10, 10]} />
        <MeshPortalMaterial color={cardBG}>
          {/* Add a red background plane inside the portal */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[10, 10, 1]} />
            <meshBasicMaterial color={cardBG} />
          </mesh>
          {children}
        </MeshPortalMaterial>
      </mesh>
      <Text
        position={[-3.8, 4, 0.06]}
        fontSize={1}
        color={cardTextTop}
        anchorX="center"
        anchorY="middle"
        materialProps={{ side: THREE.FrontSide }}
      >
        2
      </Text>
      <Text
        position={[3.8, 4, 0.06]}
        fontSize={1}
        color={cardTextTop}
        anchorX="center"
        anchorY="middle"
        materialProps={{ side: THREE.FrontSide }}
      >
        4
      </Text>
      {/* Card text - BACK SIDE */}
      <Text
        position={[-0.35, 0.4, -0.06]}
        fontSize={1}
        color="red"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        materialProps={{ side: THREE.FrontSide }}
      >
        Periodic back
      </Text>
      <Text
        position={[-3.8, 4, -0.06]}
        fontSize={1}
        color="red"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        materialProps={{ side: THREE.FrontSide }}
      >
        2
      </Text>
      <Text
        position={[3.8, 4, -0.06]}
        fontSize={1}
        color="red"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        materialProps={{ side: THREE.FrontSide }}
      >
        4
      </Text>
    </group>
  );
}

export default function CardScene({ selectedElement, theme }) {
  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 40, near: 5, far: 1000 }}>
      {/* <color args={[theme.background]} /> */}

      <ambientLight intensity={0.5} />
      <pointLight position={[0.1, 1, 1]} intensity={0.1} />
      <Card position={[0, 0, -0.5]} theme={theme}>
        <OrbitingSpheres selectedElement={selectedElement} theme={theme} />
      </Card>
      <OrbitControls enableRotate={true} />
    </Canvas>
  );
}
