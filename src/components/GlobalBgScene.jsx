import { Canvas, useFrame } from '@react-three/fiber';
import { Clouds, Cloud, OrbitControls } from '@react-three/drei';
import React, { useRef, useState } from 'react';

function Lightning({ color = 'lime', duration = 0.2, interval = 2 }) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    let timeout, intervalId;
    function flash() {
      setVisible(true);
      timeout = setTimeout(() => setVisible(false), duration * 1000);
    }
    intervalId = setInterval(flash, interval * 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(intervalId);
    };
  }, [duration, interval]);
  if (!visible) return null;
  return (
    <mesh position={[Math.random() * 10 - 5, 8, Math.random() * 10 - 5]}>
      <cylinderGeometry args={[0.1, 0.3, 8, 8]} />
      <meshBasicMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

function FlashingPointLight({
  position,
  color = 'lime',
  intensity = 1,
  distance = 15,
  decay = 0.2,
  duration = 0.2,
  interval = 2,
}) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {
    let timeout, intervalId;
    function flash() {
      setVisible(true);
      timeout = setTimeout(() => setVisible(false), duration * 1000);
    }
    intervalId = setInterval(flash, interval * 1000 + Math.random() * 1000); // randomize interval a bit
    return () => {
      clearTimeout(timeout);
      clearInterval(intervalId);
    };
  }, [duration, interval]);
  if (!visible) return null;
  return (
    <pointLight
      position={position}
      color={color}
      intensity={intensity}
      distance={distance}
      decay={decay}
    />
  );
}

function AnimatedCloud({
  initialPosition,
  speed = [0.01, 0, 0],
  children,
  ...props
}) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x += speed[0] * delta;
      ref.current.position.y += speed[1] * delta;
      ref.current.position.z += speed[2] * delta;
      // Optional: wrap around for infinite loop
      if (ref.current.position.x > 12) ref.current.position.x = -12;
      if (ref.current.position.x < -12) ref.current.position.x = 12;
    }
  });
  return (
    <Cloud ref={ref} position={initialPosition} {...props}>
      {children}
    </Cloud>
  );
}

export default function GlobalBgScene({ theme }) {
  const cloudRef = useRef();
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      style={{
        // width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
      className="min-w-[170vw] lg:max-w-[100vw]  "
    >
      <ambientLight intensity={1} />
      <Clouds ref={cloudRef} material={undefined}>
        <AnimatedCloud
          initialPosition={[0, 0, 0]}
          speed={[0.2, 0, 0]}
          segments={20}
          seed={1}
          scale={5}
          volume={10}
          color={theme.text_2}
          fade={30}
          bounds={[10, 10, 10]}
        >
          {/* Multiple flashing green point lights inside the first cloud */}
          <FlashingPointLight
            position={[0, 0, 0]}
            intensity={2}
            distance={15}
            duration={0.15}
            interval={2.5}
          />
          <FlashingPointLight
            position={[2, 2, 1]}
            intensity={51.5}
            distance={10}
            duration={0.12}
            interval={2.1}
          />
          <FlashingPointLight
            position={[-2, 1, -1]}
            intensity={51.2}
            distance={8}
            duration={0.18}
            interval={2.8}
          />
        </AnimatedCloud>
        <AnimatedCloud
          initialPosition={[5, 5, 0]}
          speed={[-0.15, 0, 0]}
          segments={15}
          seed={2}
          scale={3}
          volume={8}
          color="#e0e0ff"
          fade={20}
          bounds={[8, 8, 8]}
        >
          {/* Multiple flashing green point lights inside the second cloud */}
          <FlashingPointLight
            position={[5, 5, 0]}
            intensity={51.5}
            distance={10}
            duration={0.13}
            interval={2.2}
          />
          <FlashingPointLight
            position={[5, 0, 4]}
            intensity={51.1}
            distance={1}
            duration={1.11}
            interval={0.7}
          />
        </AnimatedCloud>
      </Clouds>
      <OrbitControls
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}
