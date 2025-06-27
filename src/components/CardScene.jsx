import { Canvas, useFrame } from '@react-three/fiber';
import {
  Text,
  OrbitControls,
  MeshPortalMaterial,
  Html,
  CubicBezierLine,
} from '@react-three/drei';
import { useRef, useState } from 'react';
import OrbitingSpheres from './OrbitScene';
import * as THREE from 'three';
import { useTheme } from '../theme/ThemeContext';
import { Tube } from '@react-three/drei';

function Card({ position, children, theme, selectedElement, cloudRef }) {
  const cardBG = theme.cellBG_3;
  const cardTextTop = theme.text_3;

  // useFrame(({ clock }) => {
  //   const t = clock.getElapsedTime();
  //   if (cloudRef) {
  //     cloudRef.current.rotation.y += 0.0005;
  //     cloudRef.current.rotation.x += 0.0005;

  //     // cloudRef.current.position.y = Math.cos(t) * 0.05;
  //   }
  // });

  return (
    <group position={position}>
      {/* Red card background */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[10, 10, 1]} />
        <meshBasicMaterial side={2} color={cardBG} />
      </mesh>
      {/* Portal effect overlays on top */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[10, 10, 1]} />
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
        position={[-3, 4, 0.06]}
        fontSize={0.71}
        color={cardTextTop}
        anchorX="center"
        anchorY="middle"
        materialProps={{ side: THREE.FrontSide }}
      >
        {selectedElement.name}
      </Text>
      <Text
        position={[3.8, 4, 0.06]}
        fontSize={0.71}
        color={cardTextTop}
        anchorX="center"
        anchorY="middle"
        materialProps={{ side: THREE.FrontSide }}
      >
        {selectedElement.state}
      </Text>
      {/* Card text - BACK SIDE */}
      <Text
        position={[-0.35, 0, -0.06]}
        fontSize={0.6}
        color={cardTextTop}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        materialProps={{ side: THREE.FrontSide }}
        maxWidth={9}
      >
        {selectedElement.description}
      </Text>
      <Text
        position={[-3.8, 4, -0.06]}
        fontSize={0.71}
        color={cardTextTop}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        materialProps={{ side: THREE.FrontSide }}
      >
        {selectedElement.block}
      </Text>
      <Text
        position={[1.8, 3.8, -0.06]}
        fontSize={0.71}
        color={cardTextTop}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        materialProps={{ side: THREE.FrontSide }}
        maxWidth={6}
      >
        {selectedElement.classification}
      </Text>
    </group>
  );
}

export default function CardScene({ selectedElement, theme }) {
  const cloudRef = useRef();

  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 45, near: 1, far: 500 }}>
      {/* <color args={[theme.background]} /> */}

      <ambientLight intensity={0.5} />
      <pointLight position={[0.1, 1, 1]} intensity={0.1} />
      {/* <Clouds ref={cloudRef} material={THREE.MeshBasicMaterial}>
        <Cloud
          segments={2} 
          seed={5}
          scale={0.7}
          volume={40}
          color="hotpink"
          fade={30}
          bounds={[1, 1, 1]}
        />
      </Clouds> */}

      <Card
        cloudRef={cloudRef}
        position={[0, 0, -0.5]}
        selectedElement={selectedElement}
        theme={theme}
      >
        <OrbitingSpheres selectedElement={selectedElement} theme={theme} />
      </Card>
      {/* Line and label always visible in front of the card, in the xy plane */}
      {/* <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-1, 2, 0, -10, 3, 0])} // Line from [0,0,0] to [8,0,0] in xy plane
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={theme.text_3} linewidth={2} />
      </line> */}
      <CubicBezierLine
        start={[0, 0, 0]} // Starting point
        end={[10, 4, 0]} // Ending point
        midA={[3, 1.5, -2]} // First control point
        midB={[0, -3, 5]} // Second control point
        color={theme.cellBG_8} // Default
        lineWidth={1} // In pixels (default)
      />
      <CubicBezierLine
        start={[0, 2.2, 0]} // Starting point
        end={[-11, 2, 0]} // Ending point
        midA={[1, 4, 0]} // First control point
        midB={[-17, -2, 3]} // Second control point
        color={theme.cellBG_8} // Default
        lineWidth={1} // In pixels (default)
      />
      {/* <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([1, 0, 0, 8, 0, 0])} // Line from [1,0,0] to [8,0,0] in xy plane
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={theme.text_3} linewidth={1} />
      </line> */}
      <Html position={[-10, 3, 0]} transform occlude>
        <div
          style={{
            // backgroundColor: '',
            color: theme.text_3,
            // backdropFilter: 'blur(50px)',
          }}
          className=" grid hover:scale-150 grid-cols-1 rounded-lg shadow-lg p-4"
        >
          <div>
            {`electronShells ${selectedElement.atomicStructure.electronShells}`}
          </div>
        </div>
      </Html>
      <Html position={[11, 5, 0]} transform occlude>
        <div
          style={{
            // backgroundColor: theme.cellBG_8,
            color: theme.text_3,
            backdropFilter: 'blur(50px)',
          }}
          className=" grid hover:scale-150  grid-cols-1 rounded-lg shadow-lg p-4"
        >
          <div>
            {`atomic weight ${selectedElement.atomicWeight.toFixed(0)}`}
          </div>
        </div>
      </Html>

      <OrbitControls enableRotate={true} enablePan={true} />
    </Canvas>
  );
}
