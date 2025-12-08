import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const AccretionDiskShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    uniform float uTime;
    
    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      float dist = length(vPos.xy);
      float angle = atan(vPos.y, vPos.x);
      
      // Swirling effect
      float noiseVal = snoise(vec2(dist * 8.0 - uTime * 3.0, angle * 3.0 + uTime * 1.0));
      
      // Ring shape
      float ring = smoothstep(1.5, 2.0, dist) * smoothstep(4.0, 3.0, dist);
      
      // Color gradient: Gold -> White -> Reddish
      vec3 colorInner = vec3(1.0, 0.9, 0.6) * 2.0; // Bright Gold (HDR)
      vec3 colorOuter = vec3(0.8, 0.3, 0.1); // Reddish
      
      vec3 finalColor = mix(colorOuter, colorInner, noiseVal * 0.5 + 0.5);
      
      // Alpha fade
      float alpha = ring * (0.8 + noiseVal * 0.2);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
}

export default function BlackHole(props) {
  const diskRef = useRef()

  useFrame((state) => {
    if (diskRef.current) {
      diskRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <group {...props}>
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Accretion Disk */}
      <mesh ref={diskRef} rotation={[-Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.5, 4.0, 128]} />
        <shaderMaterial
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={AccretionDiskShader.vertexShader}
          fragmentShader={AccretionDiskShader.fragmentShader}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Glow/Halo */}
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.2} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}
