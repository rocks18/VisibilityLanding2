import { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()

export default function DysonSwarm({ progress }) {
    const meshRef = useRef()
    const count = 1000

    // Generate random initial positions (Chaos) and target positions (Sphere)
    const data = useMemo(() => {
        const chaosPositions = []
        const spherePositions = []
        const rotations = []
        const speeds = []

        for (let i = 0; i < count; i++) {
            // Chaos: Random orbit
            const r = 3 + Math.random() * 5
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            chaosPositions.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            )

            // Sphere: Perfect shell at radius 1.2 (just larger than star)
            const r2 = 1.2
            spherePositions.push(
                r2 * Math.sin(phi) * Math.cos(theta),
                r2 * Math.sin(phi) * Math.sin(theta),
                r2 * Math.cos(phi)
            )

            rotations.push(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
            speeds.push(Math.random() * 0.5 + 0.2)
        }
        return { chaosPositions, spherePositions, rotations, speeds }
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return

        // Calculate construction progress (0 to 1) based on scroll
        // Map scroll progress 0.3 -> 0.6 to 0 -> 1 construction
        const construction = THREE.MathUtils.clamp((progress - 0.3) * 3.33, 0, 1)

        // Ease the construction
        const eased = 1 - Math.pow(1 - construction, 3) // Cubic out

        for (let i = 0; i < count; i++) {
            const ix = i * 3

            // Interpolate position
            const x = THREE.MathUtils.lerp(data.chaosPositions[ix], data.spherePositions[ix], eased)
            const y = THREE.MathUtils.lerp(data.chaosPositions[ix + 1], data.spherePositions[ix + 1], eased)
            const z = THREE.MathUtils.lerp(data.chaosPositions[ix + 2], data.spherePositions[ix + 2], eased)

            // Orbit rotation (slows down as it locks)
            const time = state.clock.elapsedTime * data.speeds[i] * (1 - eased * 0.9)

            tempObject.position.set(x, y, z)

            // Rotate panels to face center as they lock
            tempObject.lookAt(0, 0, 0)

            // Add some chaotic rotation when not locked
            if (eased < 0.9) {
                tempObject.rotation.x += time
                tempObject.rotation.z += time
            }

            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <boxGeometry args={[0.1, 0.1, 0.01]} />
            <meshStandardMaterial
                color="#ffd700"
                metalness={1}
                roughness={0.2}
                emissive="#ffd700"
                emissiveIntensity={2}
                toneMapped={false}
            />
        </instancedMesh>
    )
}
