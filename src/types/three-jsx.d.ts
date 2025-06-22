import { Object3D } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      boxBufferGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      pointLight: any
      group: any
    }
  }
} 