import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Supernova({ progress }) {
    const points = useRef()

    // Generate particles
    const particleCount = 4000
    const [positions, randoms] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3)
        const rnd = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)
            const r = Math.random() * 1.5 // Tighter initial radius

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            pos[i * 3 + 2] = r * Math.cos(phi)

            rnd[i * 3] = (Math.random() - 0.5)
            rnd[i * 3 + 1] = (Math.random() - 0.5)
            rnd[i * 3 + 2] = (Math.random() - 0.5)
        }
        return [pos, rnd]
    }, [])

    useFrame((state) => {
        if (points.current) {
            // Explosion logic based on progress
            // Progress 0.5 -> 0.8 is the explosion phase
            const explosionProgress = Math.max(0, (progress - 0.5) * 3.33)

            const positionsArray = points.current.geometry.attributes.position.array

            for (let i = 0; i < particleCount; i++) {
                const ix = i * 3
                const iy = i * 3 + 1
                const iz = i * 3 + 2

                // Base position
                let x = positions[ix]
                let y = positions[iy]
                let z = positions[iz]

                // Violent expansion
                const expansion = explosionProgress * 40 * (1 + Math.random() * 2)

                positionsArray[ix] = x * (1 + expansion)
                positionsArray[iy] = y * (1 + expansion)
                positionsArray[iz] = z * (1 + expansion)
            }

            points.current.geometry.attributes.position.needsUpdate = true
            // Fade out slowly
            points.current.material.opacity = Math.max(0, 1 - explosionProgress * 1.2)
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#ffffff"
                transparent
                opacity={1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}
