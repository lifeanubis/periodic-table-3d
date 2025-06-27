import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  cloneElement,
} from 'react';
import { Cloud, Clouds, OrbitControls, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitingSpheres({ selectedElement, theme }) {
  const redRefs = useRef([]);
  const [orbits, setOrbits] = useState();
  const neucleus = useRef([]);

  const electronGeometry = useMemo(
    () => <sphereGeometry args={[0.1, 32, 32]} />,
    [],
  );
  const electronMaterial = useMemo(
    () => (
      <meshStandardMaterial
        color={theme.text_2}
        emissive={theme.text_2}
        emissiveIntensity={2}
      />
    ),
    [theme],
  );

  // Animate the red spheres in orbit
  let tempo = 0;
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    let radius = 2;
    selectedElement.atomicStructure.electronShells.map((element, index) => {
      if (index > 0) {
        // radius += index * 0.75; // Increment radius for each orbit
        tempo += selectedElement.atomicStructure.electronShells[index - 1];

        radius += 0.75; // Increment radius for each orbit
      } else {
        tempo = 0;
      }

      for (let i = 0; i < selectedElement.id; i++) {
        const ref = redRefs.current[i + tempo];
        const refNucleus = neucleus.current[i + tempo];

        // if (selectedElement.id > 20 && refNucleus && ref) {
        //   refNucleus.scale.set(0.5, 0.5, 0.5);
        //   ref.scale.set(0.5, 0.5, 0.5);
        // }

        if (ref && refNucleus) {
          const angle = (2 * Math.PI * i) / element + t / 4;
          ref.position.x = Math.cos(-angle) * radius;
          ref.position.y = Math.sin(-angle) * radius;
          refNucleus.position.x = Math.cos(angle) * -0.3;
          refNucleus.position.y = Math.sin(angle) * -0.3;
          // refNucleus.position.z = Math.cos(angle) * 0.5;

          // electron clouds
          // refNucleus.position.x = Math.cos(angle) * radius;
          // refNucleus.position.y = Math.sin(angle) * radius;

          // electron clouds
        }
      }
    });
  });

  const orbitDetails = (i) => {
    let structure = [2, 8, 8];
    let radius = 2;
    selectedElement.atomicStructure.electronShells.forEach((element, index) => {
      radius += index * 0.75;
      console.log(radius, 'radius', element, 'index');
    });

    return (
      <mesh
        key={i}
        ref={(el) => (redRefs.current[i] = el)}
        position={[5, 0, 2]}
      >
        {electronGeometry}
        {electronMaterial}
      </mesh>
    );
  };

  useEffect(() => {
    // console.log('selectedElement', selectedElement);
    console.log(
      selectedElement.atomicStructure.electronShells,
      '=====================',
    );

    if (selectedElement) {
      setOrbits(selectedElement.atomicStructure.electronShells);
      // atomicStructure;
    }
  }, [selectedElement.id]);

  // Create a single mesh template for the nucleus
  const nucleusTemplate = useMemo(
    () => (
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color={theme.cellBG_7} />
      </mesh>
    ),
    [theme.cellBG_7],
  );

  // Memoize the nucleus meshes using cloneElement
  const nucleusMeshes = useMemo(
    () =>
      Array.from({ length: selectedElement.atomicWeight }).map((_, i) =>
        cloneElement(nucleusTemplate, {
          key: i,
          ref: (el) => (neucleus.current[i] = el),
          children: [
            <sphereGeometry args={[0.7, 32, 32]} key="geo" />,
            <meshBasicMaterial
              key="mat"
              color={i % 2 === 0 ? theme.cellBG_7 : theme.text_3}
            />,
          ],
        }),
      ),
    [selectedElement.atomicWeight, theme, nucleusTemplate],
  );

  const setScale = (length) => {
    if (length <= 34) {
      return 1;
    }
    if (length > 34 && length <= 52) {
      return 0.8;
    }
    if (length > 54) {
      return 0.7;
    }
  };

  return (
    <>
      <group scale={setScale(selectedElement.id)}>
        {/* Blue/Green/Gold central spheres */}
        {nucleusMeshes}
        {/* Glowing orbiting spheres */}
        {Array.from({ length: selectedElement.id }).map((_, i) =>
          orbitDetails(i),
        )}
        {selectedElement.atomicStructure.electronShells.map((orbit, index) => {
          const radius = 2 + index * 0.75; // Increment radius for each orbit
          return (
            <mesh key={index} position={[0, 0, 2]}>
              <meshStandardMaterial
                color={theme.cellBG_2}
                emissive={theme.cellBG_2}
                emissiveIntensity={0.2}
              />
              <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
            </mesh>
          );
        })}
      </group>
      {/* Single line and label far in front of the card scene group */}
    </>
  );
}

export default OrbitingSpheres;
