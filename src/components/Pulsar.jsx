import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Pulsar() {
    const group = useRef()

    useFrame((state, delta) => {
        if (group.current) {
            // Rapid rotation
            group.current.rotation.y += delta * 10

            // Pulse scale
            const scale = 1 + Math.sin(state.clock.elapsedTime * 20) * 0.2
            group.current.scale.set(scale, 1, scale)
        }
    })

    return (
        <group ref={group}>
            {/* Top Jet */}
            <mesh position={[0, 2, 0]} rotation={[0, 0, 0]}>
                <coneGeometry args={[0.1, 4, 32, 1, true]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={10}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Bottom Jet */}
            <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.1, 4, 32, 1, true]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={10}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Core Glow */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial
                    color="#ffaa00"
                    emissive="#ffaa00"
                    emissiveIntensity={5}
                />
            </mesh>
        </group>
    )
}
