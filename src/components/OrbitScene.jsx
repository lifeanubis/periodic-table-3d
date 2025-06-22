import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { colorsBlue } from '../utils/colorConstants';

function OrbitingSpheres({ selectedElement }) {
  const redRefs = useRef([]);
  const [orbits, setOrbits] = useState();
  const neucleus = useRef([]);

  // Shared geometry and material for red spheres
  const electronGeometry = useMemo(
    () => <sphereGeometry args={[0.1, 32, 32]} />,
    [],
  );
  const electronMaterial = useMemo(
    () => (
      <meshStandardMaterial
        color={colorsBlue.primary}
        emissive={colorsBlue.primary}
        emissiveIntensity={2}
      />
    ),
    [],
  );

  // Ring geometry for orbit outline

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

        if (ref) {
          const angle = (2 * Math.PI * i) / element + t;
          ref.position.x = Math.cos(angle) * radius;
          ref.position.y = Math.sin(angle) * radius;
          refNucleus.position.x = Math.cos(angle) * 0.3;
          refNucleus.position.y = Math.sin(angle) * 0.3;
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

  return (
    <group>
      {/* Blue central sphere */}
      {Array.from({ length: selectedElement.id }).map((_, i) => (
        <mesh
          ref={(el) => (neucleus.current[i] = el)}
          position={[
            Math.cos((2 * Math.PI * i) / selectedElement.id) * 0.3,
            Math.sin((2 * Math.PI * i) / selectedElement.id) * 0.3,
            0,
          ]}
        >
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial color={i % 2 === 0 ? 'blue' : 'green'} />
        </mesh>
      ))}

      {/* Red orbiting spheres using shared geometry/material */}
      {Array.from({ length: selectedElement.id }).map((_, i) =>
        orbitDetails(i),
      )}
      {selectedElement.atomicStructure.electronShells.map((orbit, index) => {
        const radius = 2 + index * 0.75; // Increment radius for each orbit
        return (
          <mesh key={index} position={[0, 0, 2]}>
            <meshStandardMaterial
              color={colorsBlue.accent}
              emissive={colorsBlue.accent}
              emissiveIntensity={0.2}
            />
            <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
          </mesh>
        );
      })}
    </group>
  );
}

export default OrbitingSpheres;
